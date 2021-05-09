import { Box, Button, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { loadTranscript } from 'store/actions/transcript';
import { useTypedDispatch } from 'utils/hooks';
import Form from './Form';

const VideoSeeker: React.FC<{
  segment?: { startTime: number; endTime: number };
  onProgress?: (playedSeconds: number) => void;
}> = ({ segment, onProgress }) => {
  const dispatch = useTypedDispatch();
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<ReactPlayer>(null);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [urlInputValue, setUrlInputValue] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    // setPlayedSeconds(segment?.startTime ?? 0);
    setIsPlaying(true);
    videoRef?.current?.seekTo(segment?.startTime ?? 0, 'seconds');
    videoRef?.current?.getInternalPlayer()?.playVideo();
  }, [segment]);

  useEffect(() => {
    if (isPlaying && segment && playedSeconds >= segment.endTime) {
      setIsPlaying(false);
      videoRef?.current?.getInternalPlayer()?.pauseVideo();
    }
  }, [isPlaying, segment, playedSeconds]);

  return (
    <Stack>
      <Form
        onSubmit={() => {
          setUrl(urlInputValue);
          dispatch(loadTranscript.request(urlInputValue));
        }}
      >
        <FormControl>
          <FormLabel>YouTube URL</FormLabel>
          <Input
            type="text"
            required
            onChange={(e) => setUrlInputValue(e.target.value)}
            value={urlInputValue}
          />
        </FormControl>
        <Button type="submit">Set</Button>
      </Form>
      <Box backgroundColor="black">
        <ReactPlayer
          controls
          url={url}
          playing={isPlaying}
          ref={videoRef}
          onProgress={({ playedSeconds: pS }) => {
            setPlayedSeconds(pS);
            if (onProgress) {
              onProgress(pS);
            }
          }}
          progressInterval={10}
        />
      </Box>
    </Stack>
  );
};

export default VideoSeeker;
