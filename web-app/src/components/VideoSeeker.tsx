import { Box, Button, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { setUrl } from 'store/actions/cards';
import { loadTranscript } from 'store/actions/transcript';
import { urlSelector } from 'store/selectors/cards';
import { useTypedDispatch, useTypedSelector } from 'utils/hooks';
import Form from './Form';

const VideoSeeker: React.FC<{
  segment?: { startTime: number; endTime: number };
  onProgress?: (playedSeconds: number) => void;
  muted?: boolean;
}> = ({ segment, onProgress, muted = false }) => {
  const dispatch = useTypedDispatch();
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<ReactPlayer>(null);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [urlInputValue, setUrlInputValue] = useState('');
  const url = useTypedSelector(urlSelector);

  useEffect(() => {
    if (segment) {
      setIsPlaying(true);
      videoRef?.current?.seekTo(segment?.startTime ?? 0, 'seconds');
      // videoRef?.current?.getInternalPlayer()?.playVideo();
    }
  }, [segment]);

  useEffect(() => {
    if (isPlaying && segment && playedSeconds >= segment.endTime) {
      setIsPlaying(false);
      videoRef?.current?.getInternalPlayer()?.pauseVideo();
    }
  }, [isPlaying, segment, playedSeconds]);

  useEffect(() => {
    if (isPlaying) {
      videoRef?.current?.getInternalPlayer()?.playVideo();
    } else {
      // videoRef?.current?.getInternalPlayer()?.pauseVideo();
    }
  }, [isPlaying]);

  return (
    <Stack>
      <Form
        onSubmit={() => {
          dispatch(setUrl(urlInputValue));
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
          muted={muted}
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
