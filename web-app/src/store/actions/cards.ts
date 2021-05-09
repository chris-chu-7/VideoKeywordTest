import { createAction } from 'typesafe-actions';
import type { FlashCardType } from 'types/models';

export const addCard = createAction('cards/ADD_CARD', (card: FlashCardType) => card)();

export const setUrl = createAction('cards/SET_URL', (url: string) => url)();
