import { RootState } from 'store/reducers';

export const cardsSelector = (state: RootState) => state.cards.cards;

export const urlSelector = (state: RootState) => state.cards.url;
