import logging
import os
from pathlib import Path
import uvicorn

from fastapi import FastAPI
from fastapi.logger import logger
from fastapi.middleware.cors import CORSMiddleware
from fastapi.routing import APIRoute
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from starlette.requests import Request
from starlette.responses import Response

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
    allow_origins=["http://localhost:3001"],
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
async def get_transcript(url: str):
    return GetTranscriptResBody(
        words=[
            Word(**{"startTime": "0s", "endTime": "0.900s", "word": "in"}),
            Word(**{"startTime": "0.900s", "endTime": "1.400s", "word": "December"}),
            Word(**{"startTime": "1.400s", "endTime": "2.400s", "word": "2019"}),
            Word(**{"startTime": "2.400s", "endTime": "3.400s", "word": "China"}),
            Word(**{"startTime": "3.400s", "endTime": "3.900s", "word": "notified"}),
            Word(**{"startTime": "3.900s", "endTime": "4s", "word": "the"}),
            Word(**{"startTime": "4s", "endTime": "4.300s", "word": "World"}),
            Word(**{"startTime": "4.300s", "endTime": "4.600s", "word": "Health"}),
            Word(
                **{"startTime": "4.600s", "endTime": "5.500s", "word": "Organization"}
            ),
            Word(**{"startTime": "5.500s", "endTime": "5.700s", "word": "but"}),
            Word(**{"startTime": "5.700s", "endTime": "6.100s", "word": "several"}),
            Word(**{"startTime": "6.100s", "endTime": "6.500s", "word": "cases"}),
            Word(**{"startTime": "6.500s", "endTime": "6.700s", "word": "of"}),
            Word(**{"startTime": "6.700s", "endTime": "6.900s", "word": "human"}),
            Word(**{"startTime": "6.900s", "endTime": "7.400s", "word": "respiratory"}),
            Word(**{"startTime": "7.400s", "endTime": "8.100s", "word": "illness"}),
            Word(**{"startTime": "8.100s", "endTime": "8.500s", "word": "a"}),
            Word(**{"startTime": "8.500s", "endTime": "8.600s", "word": "disease"}),
            Word(**{"startTime": "8.600s", "endTime": "9.200s", "word": "later"}),
            Word(**{"startTime": "9.200s", "endTime": "9.600s", "word": "named"}),
            Word(**{"startTime": "9.600s", "endTime": "10.700s", "word": "covid-19"}),
            Word(**{"startTime": "10.700s", "endTime": "11.400s", "word": "the"}),
            Word(**{"startTime": "11.400s", "endTime": "11.900s", "word": "virus"}),
            Word(**{"startTime": "11.900s", "endTime": "12.500s", "word": "using"}),
            Word(**{"startTime": "12.500s", "endTime": "12.600s", "word": "this"}),
            Word(**{"startTime": "12.600s", "endTime": "13.100s", "word": "disease"}),
            Word(**{"startTime": "13.100s", "endTime": "13.300s", "word": "is"}),
            Word(**{"startTime": "13.300s", "endTime": "13.700s", "word": "known"}),
            Word(**{"startTime": "13.700s", "endTime": "13.800s", "word": "as"}),
            Word(**{"startTime": "13.800s", "endTime": "14.400s", "word": "severe"}),
            Word(**{"startTime": "14.400s", "endTime": "14.600s", "word": "acute"}),
            Word(
                **{"startTime": "14.600s", "endTime": "14.900s", "word": "respiratory"}
            ),
            Word(**{"startTime": "14.900s", "endTime": "15.900s", "word": "syndrome"}),
            Word(
                **{"startTime": "15.900s", "endTime": "16.200s", "word": "coronavirus"}
            ),
            Word(**{"startTime": "16.200s", "endTime": "17.200s", "word": "to"}),
            Word(**{"startTime": "17.200s", "endTime": "18.900s", "word": "the"}),
            Word(**{"startTime": "18.900s", "endTime": "19.100s", "word": "disease"}),
            Word(**{"startTime": "19.100s", "endTime": "19.400s", "word": "spreads"}),
            Word(**{"startTime": "19.400s", "endTime": "20.200s", "word": "through"}),
            Word(**{"startTime": "20.200s", "endTime": "20.400s", "word": "small"}),
            Word(**{"startTime": "20.400s", "endTime": "20.800s", "word": "droplets"}),
            Word(**{"startTime": "20.800s", "endTime": "21.100s", "word": "that"}),
            Word(**{"startTime": "21.100s", "endTime": "21.400s", "word": "are"}),
            Word(**{"startTime": "21.400s", "endTime": "21.800s", "word": "expelled"}),
            Word(**{"startTime": "21.800s", "endTime": "21.900s", "word": "from"}),
            Word(**{"startTime": "21.900s", "endTime": "22.100s", "word": "the"}),
            Word(**{"startTime": "22.100s", "endTime": "22.300s", "word": "nose"}),
            Word(**{"startTime": "22.300s", "endTime": "22.400s", "word": "or"}),
            Word(**{"startTime": "22.400s", "endTime": "22.500s", "word": "mouth"}),
            Word(**{"startTime": "22.500s", "endTime": "23.100s", "word": "when"}),
            Word(**{"startTime": "23.100s", "endTime": "23.100s", "word": "a"}),
            Word(**{"startTime": "23.100s", "endTime": "23.500s", "word": "person"}),
            Word(**{"startTime": "23.500s", "endTime": "23.600s", "word": "with"}),
            Word(**{"startTime": "23.600s", "endTime": "24s", "word": "covid-19"}),
            Word(**{"startTime": "24s", "endTime": "24.900s", "word": "cough"}),
            Word(**{"startTime": "24.900s", "endTime": "25.300s", "word": "or"}),
            Word(**{"startTime": "25.300s", "endTime": "26s", "word": "exhales"}),
            Word(**{"startTime": "26s", "endTime": "28.100s", "word": "that."}),
            Word(**{"startTime": "28.100s", "endTime": "28.400s", "word": "Even"}),
            Word(**{"startTime": "28.400s", "endTime": "28.800s", "word": "close"}),
            Word(**{"startTime": "28.800s", "endTime": "29s", "word": "to"}),
            Word(**{"startTime": "29s", "endTime": "29.200s", "word": "someone"}),
            Word(**{"startTime": "29.200s", "endTime": "29.600s", "word": "who's"}),
            Word(**{"startTime": "29.600s", "endTime": "29.700s", "word": "infected"}),
            Word(**{"startTime": "29.700s", "endTime": "30.500s", "word": "can"}),
            Word(**{"startTime": "30.500s", "endTime": "30.700s", "word": "put"}),
            Word(**{"startTime": "30.700s", "endTime": "30.800s", "word": "you"}),
            Word(**{"startTime": "30.800s", "endTime": "30.900s", "word": "at"}),
            Word(**{"startTime": "30.900s", "endTime": "31.100s", "word": "risk"}),
        ]
    )


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
