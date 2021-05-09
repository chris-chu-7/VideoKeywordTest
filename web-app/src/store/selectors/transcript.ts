import { RootState } from 'store/reducers';

export const wordsSelector = (state: RootState) => state.transcript.words;
