import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import Form from './Form';

const Video: React.FC = () => {
  const [mute, setMute] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const videoRef = useRef<ReactPlayer>(null);

  return (
    <Stack>
      <Button onClick={() => setIsPlaying((p) => !p)}> Toggle Play/Pause</Button>
      <Button onClick={() => setMute((m) => !m)}> Toggle Mute</Button>
      <Button onClick={() => setIsHidden((m) => !m)}> Toggle Hidden</Button>
      <Form>
        <HStack>
          <FormControl>
            <FormLabel>Min</FormLabel>
            <NumberInput
              defaultValue={0}
              min={0}
              max={59}
              value={minutes}
              onChange={(_, m) => setMinutes(m)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel>Seconds</FormLabel>
            <NumberInput
              defaultValue={0}
              min={0}
              max={59}
              value={seconds}
              onChange={(_, s) => setSeconds(s)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </HStack>
        <Button
          onClick={() => {
            setIsPlaying(true);
            videoRef?.current?.seekTo(minutes * 60 + seconds);
          }}
        >
          {' '}
          Seek
        </Button>
      </Form>
      <Box backgroundColor="black">
        <ReactPlayer
          style={{ opacity: isHidden ? 0 : 1 }}
          controls
          volume={mute ? 0 : 1}
          url="https://www.youtube.com/watch?v=y3Av4zCFygQ"
          playing={isPlaying}
          ref={videoRef}
        />
      </Box>
    </Stack>
  );
};

export default Video;
