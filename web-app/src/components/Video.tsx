import { Box, Button, Flex, Radio, Stack, Text } from '@chakra-ui/react';
import { Page } from 'constants/pages';
import React, { useState } from 'react';
import { addCard } from 'store/actions/cards';
import { setPage } from 'store/actions/pages';
import { cardsSelector } from 'store/selectors/cards';
import { wordsSelector } from 'store/selectors/transcript';
import { WordType } from 'types/models';
import { useTypedDispatch, useTypedSelector } from 'utils/hooks';
import VideoSeeker from './VideoSeeker';

const Video: React.FC = () => {
  const dispatch = useTypedDispatch();
  const [startWordIndex, setStartWordIndex] = useState<number>();
  const [endWordIndex, setEndWordIndex] = useState<number>();
  const [wordType, setWordType] = useState(WordType.START);
  const [keywordIndexes, setKeywordIndexes] = useState(new Set());
  const [playedSeconds, setPlayedSeconds] = useState(0);

  const [segment, setSegment] = useState<{ startTime: number; endTime: number }>();

  const words = useTypedSelector(wordsSelector);
  const cards = useTypedSelector(cardsSelector);

  return (
    <Stack padding="16">
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
        <Button
          onClick={() =>
            startWordIndex &&
            keywordIndexes.size > 0 &&
            endWordIndex &&
            dispatch(
              addCard({
                words: words.filter((_, index) => startWordIndex <= index && index <= endWordIndex),
              }),
            )
          }
        >
          Create New Card
        </Button>
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
      <Text>Number of cards: {cards.length}</Text>
      <Button disabled={cards.length === 0} onClick={() => dispatch(setPage(Page.FLASHCARDS))}>
        View Flashcards
      </Button>
    </Stack>
  );
};

export default Video;
