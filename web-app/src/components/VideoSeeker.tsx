import { Box, Stack } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { urlSelector } from 'store/selectors/cards';
import { useTypedSelector } from 'utils/hooks';

const VideoSeeker: React.FC<{
  segment?: { startTime: number; endTime: number };
  onProgress?: (playedSeconds: number) => void;
  muted?: boolean;
  isHidden?: boolean;
}> = ({ segment, onProgress, muted = false, isHidden = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<ReactPlayer>(null);
  const [playedSeconds, setPlayedSeconds] = useState(0);
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
      <Box backgroundColor="black">
        <ReactPlayer
          style={{ opacity: isHidden ? 0 : 1 }}
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
