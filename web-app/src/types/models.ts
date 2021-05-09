export type Word = {
  startTime: number;
  endTime: number;
  word: string;
};

export type FlashCardType = {
  keywords: Word[];
  sentence: Word[];
};

export type Transcript = Word[];
