export type Word = {
  startTime: number;
  endTime: number;
  word: string;
  type?: WordType;
};

export type FlashCardType = {
  // keywords: Word[];
  // sentence: Word[];
  words: Word[];
};

export type Transcript = Word[];

export enum WordType {
  START = 'START',
  KEYWORD = 'KEYWORD',
  END = 'END',
}
