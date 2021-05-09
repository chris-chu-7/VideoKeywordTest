import json
import logging
import os
from pathlib import Path
import uvicorn
import subprocess

from fastapi import FastAPI, status
from fastapi.logger import logger
from fastapi.middleware.cors import CORSMiddleware
from fastapi.routing import APIRoute
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from starlette.requests import Request
from starlette.responses import Response
from converter import Converter
from google.cloud import speech
from google.cloud import storage
from pytube import YouTube
from google.protobuf.json_format import MessageToDict

dirname = Path(__file__).resolve().parent
MAX_YT_VIDEO_LENGTH_IN_SECONDS = 300

credential_path = dirname / ".." / "credentials/VideoKeywordTest-8e1da767906e.json"
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = str(credential_path.absolute())

audio_folder_path = dirname / "audio"
audio_folder_path.mkdir(exist_ok=True)
transcripts_folder_path = dirname / "transcripts"
transcripts_folder_path.mkdir(exist_ok=True)
audio_converter = Converter()
speech_client = speech.SpeechClient()
storage_client = storage.Client.from_service_account_json(credential_path)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s.%(msecs)03d %(levelname)s %(module)s - %(funcName)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)

dirname = Path(__file__).resolve().parent


origins = [
    "http://localhost:3001",
]

app = FastAPI()


# https://github.com/tiangolo/fastapi/issues/775#issuecomment-592946834
async def catch_exceptions_middleware(request: Request, call_next):
    try:
        return await call_next(request)
    except Exception as exc:
        logger.exception(exc)
        return Response("Internal server error", status_code=500)


# TODO: Serve the React app using fastapi
app.middleware("http")(catch_exceptions_middleware)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001", "http://protect-nezuko.tech"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class GetPingResBody(BaseModel):
    message: str


@app.get("/ping", response_model=GetPingResBody)
async def ping():
    return GetPingResBody(message="PONG")


class Word(BaseModel):
    startTime: str
    endTime: str
    word: str


class GetTranscriptResBody(BaseModel):
    words: list[Word]


@app.get("/transcript", response_model=GetTranscriptResBody)
async def get_transcript(
    url: str,
    response: Response,
):

    # Download Audio of the YouTube video
    yt = YouTube(url)
    mp4_audio_file_path = audio_folder_path / f"{yt.video_id}.mp4"
    wav_audio_file_path = audio_folder_path / f"{yt.video_id}.wav"
    transcript_file_path = transcripts_folder_path / f"{yt.video_id}.json"

    full_words_list = []

    if transcript_file_path.exists():
        full_words_list = json.loads(transcript_file_path.read_text())
    else:
        if yt.length > MAX_YT_VIDEO_LENGTH_IN_SECONDS:
            response.status_code = status.HTTP_400_BAD_REQUEST
            return

        stream = yt.streams.filter(only_audio=True, subtype="mp4").first()
        stream.download(audio_folder_path, filename=yt.video_id)

        # Convert video to WAV format
        command = f"ffmpeg -y -i {mp4_audio_file_path} -ab 160k -ac 2 -ar 16000 -vn {wav_audio_file_path}"
        subprocess.call(command, shell=True)

        # Upload video to Google Cloud Storage
        bucket = storage_client.get_bucket("video-keyword-test")
        blob = bucket.blob(f"{yt.video_id}.wav")
        blob.upload_from_filename(filename=str(wav_audio_file_path.absolute()))

        # Run the Google Speech-to-Text API
        audio = speech.RecognitionAudio(
            uri=f"gs://video-keyword-test/{yt.video_id}.wav"
        )
        config = speech.RecognitionConfig(
            sample_rate_hertz=16000,
            language_code="en-US",
            audio_channel_count=2,
            enable_word_time_offsets=True,
        )
        operation = speech_client.long_running_recognize(config=config, audio=audio)
        response = operation.result()
        if len(response.results) == 0:
            raise Exception("Empty result")

        # Download the Google Speech-to-Text results
        # Each result is for a consecutive portion of the audio. Iterate through
        # them to get the transcripts for the entire audio file.
        for i, result in enumerate(response.results):
            # The first alternative is the most likely one for this portion.
            print("Transcript: {}".format(result.alternatives[0].transcript))
            print("Confidence: {}".format(result.alternatives[0].confidence))

            most_probable_result = result.alternatives[0]

            dict_result = MessageToDict(most_probable_result._pb)
            full_words_list.extend(dict_result["words"])

        with open(transcript_file_path, "w") as json_file:
            json_file.write(json.dumps(full_words_list))

    return GetTranscriptResBody(words=[Word(**word) for word in full_words_list])


build_dir_path = dirname / ".." / "web-app" / "build"
if build_dir_path.exists():
    logger.info("Build directory exists: %s", build_dir_path)
    app.mount(
        "/",
        StaticFiles(directory=dirname / ".." / "web-app" / "build", html=True),
        name="site",
    )
else:
    logger.info("Build directory does not exist: %s", build_dir_path)


def use_route_names_as_operation_ids(app: FastAPI) -> None:
    """
    Simplify operation IDs so that generated API clients have simpler function
    names.

    Should be called only after all routes have been added.
    """
    for route in app.routes:
        if isinstance(route, APIRoute):
            route.operation_id = route.name  # in this case, 'read_items'


use_route_names_as_operation_ids(app)
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8002)
