import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Button, FormLabel, HStack, IconButton, Switch, Text, VStack } from '@chakra-ui/react';
import { Page } from 'constants/pages';
import React, { useEffect, useState } from 'react';
import { setPage } from 'store/actions/pages';
import { cardsSelector } from 'store/selectors/cards';
import { useTypedDispatch, useTypedSelector } from 'utils/hooks';
import Card from './Card';
import VideoSeeker from './VideoSeeker';

const Cards: React.FC = () => {
  const dispatch = useTypedDispatch();
  const cards = useTypedSelector(cardsSelector);
  const [cardIndex, setCardIndex] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [segment, setSegment] = useState<{ startTime: number; endTime: number }>();
  useEffect(() => setIsHidden(true), [cardIndex]);

  useEffect(() => {}, [playedSeconds]);

  const card = cards[cardIndex];

  return (
    <VStack padding="16">
      <HStack>
        <FormLabel>Show Answer</FormLabel>
        <Switch onChange={() => setIsHidden((h) => !h)} isChecked={!isHidden} />
      </HStack>
      <Text>Card Number: {cardIndex + 1}</Text>
      <HStack>
        <IconButton
          aria-label="Previous card"
          icon={<ChevronLeftIcon />}
          onClick={() => setCardIndex((i) => i - 1)}
          disabled={cardIndex === 0}
        />
        <Card
          isHidden={isHidden}
          card={cards[cardIndex]}
          setIsMuted={setIsMuted}
          playedSeconds={playedSeconds}
        />
        <IconButton
          aria-label="Next card"
          icon={<ChevronRightIcon />}
          onClick={() => setCardIndex((i) => i + 1)}
          disabled={cardIndex === cards.length - 1}
        />
      </HStack>
      <Button
        onClick={() =>
          setSegment({
            startTime: card.words[0].startTime,
            endTime: card.words[card.words.length - 1].endTime,
          })
        }
      >
        Play
      </Button>
      <VideoSeeker
        onProgress={(pS) => setPlayedSeconds(pS)}
        muted={isMuted && isHidden}
        isHidden={isHidden}
        segment={segment}
      />
      <Button onClick={() => dispatch(setPage(Page.VIDEO))}>Return</Button>
    </VStack>
  );
};

export default Cards;
