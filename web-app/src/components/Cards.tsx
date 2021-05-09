import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Button, HStack, IconButton, Stack, VStack } from '@chakra-ui/react';
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

  useEffect(() => {}, [playedSeconds]);

  return (
    <VStack padding="16">
      <HStack>
        <IconButton
          aria-label="Previous card"
          icon={<ChevronLeftIcon />}
          onClick={() => setCardIndex((i) => i - 1)}
          disabled={cardIndex === 0}
        />
        <Card card={cards[cardIndex]} setIsMuted={setIsMuted} playedSeconds={playedSeconds} />
        <IconButton
          aria-label="Next card"
          icon={<ChevronRightIcon />}
          onClick={() => setCardIndex((i) => i + 1)}
          disabled={cardIndex === cards.length - 1}
        />
      </HStack>
      <VideoSeeker onProgress={(pS) => setPlayedSeconds(pS)} muted={isMuted} />
      <Button onClick={() => dispatch(setPage(Page.VIDEO))}>Return</Button>
    </VStack>
  );
};

export default Cards;
