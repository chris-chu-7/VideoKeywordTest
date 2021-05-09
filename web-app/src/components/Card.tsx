import { Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useMemo } from 'react';
import { FlashCardType, WordType } from 'types/models';

const Card: React.FC<{
  card: FlashCardType;
  setIsMuted: (isMuted: boolean) => void;
  playedSeconds: number;
  isHidden: boolean;
}> = ({ card, setIsMuted, playedSeconds, isHidden }) => {
  const keywords = useMemo(() => card.words.filter((word) => word.type === WordType.KEYWORD), [
    card,
  ]);

  useEffect(() => {
    if (keywords.some((word) => word.startTime <= playedSeconds && playedSeconds <= word.endTime)) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  }, [playedSeconds, keywords, setIsMuted]);

  return (
    <Flex padding="16" border="solid">
      {card.words.map((word, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <Text key={i}>{word.type === WordType.KEYWORD && isHidden ? '___' : word.word}&nbsp;</Text>
      ))}
    </Flex>
  );
};

export default Card;
