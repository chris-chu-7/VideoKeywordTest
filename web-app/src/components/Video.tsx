import { Box, Button, Flex, Radio, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { wordsSelector } from 'store/selectors/transcript';
import { useTypedSelector } from 'utils/hooks';
import VideoSeeker from './VideoSeeker';

enum WordType {
  START = 'START',
  KEYWORD = 'KEYWORD',
  END = 'END',
}

const Video: React.FC = () => {
  const [startWordIndex, setStartWordIndex] = useState<number>();
  const [endWordIndex, setEndWordIndex] = useState<number>();
  const [wordType, setWordType] = useState(WordType.START);
  const [keywordIndexes, setKeywordIndexes] = useState(new Set());
  const [playedSeconds, setPlayedSeconds] = useState(0);

  const [segment, setSegment] = useState<{ startTime: number; endTime: number }>();

  const words = useTypedSelector(wordsSelector);

  return (
    <Stack>
      <VideoSeeker segment={segment} onProgress={(pS) => setPlayedSeconds(pS)} />
      <Button
        type="submit"
        onClick={() => {
          if (
            startWordIndex !== undefined &&
            endWordIndex !== undefined &&
            words[startWordIndex].startTime <= words[endWordIndex].endTime
          ) {
            setSegment({
              startTime: words[startWordIndex].startTime,
              endTime: words[endWordIndex].endTime,
            });
          }
        }}
      >
        Play
      </Button>
      <Stack direction="row">
        <Box onClick={() => setWordType(WordType.START)}>
          <Radio isChecked={WordType.START === wordType}>
            <Text color="blue">Start</Text>
          </Radio>
        </Box>
        <Box onClick={() => setWordType(WordType.KEYWORD)}>
          <Radio isChecked={WordType.KEYWORD === wordType}>
            <Text color="orange">Keywords</Text>
          </Radio>
        </Box>
        <Box onClick={() => setWordType(WordType.END)}>
          <Radio isChecked={WordType.END === wordType} onClick={() => setWordType(WordType.END)}>
            <Text color="red">End</Text>
          </Radio>
        </Box>
      </Stack>
      <Flex wrap="wrap">
        {words.map((word, i) => (
          <Button
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            colorScheme={
              startWordIndex === i
                ? 'blue'
                : keywordIndexes.has(i)
                ? 'orange'
                : endWordIndex === i
                ? 'red'
                : word.startTime <= playedSeconds && playedSeconds <= word.endTime
                ? 'yellow'
                : 'gray'
            }
            onClick={() => {
              switch (wordType) {
                case WordType.START:
                  if (startWordIndex === i) {
                    setStartWordIndex(undefined);
                  } else {
                    setStartWordIndex(i);
                  }
                  break;
                case WordType.KEYWORD:
                  if (keywordIndexes.has(i)) {
                    setKeywordIndexes((indexes) => {
                      indexes.delete(i);
                      return new Set(indexes);
                    });
                  } else {
                    setKeywordIndexes((indexes) => new Set(indexes.add(i)));
                  }
                  break;
                case WordType.END:
                  if (endWordIndex === i) {
                    setEndWordIndex(undefined);
                  } else {
                    setEndWordIndex(i);
                  }
                  break;
                default:
                  throw Error(`Invalid Word Type: ${wordType}`);
              }
            }}
          >
            {word.word}
          </Button>
        ))}
      </Flex>
    </Stack>
  );
};

export default Video;
