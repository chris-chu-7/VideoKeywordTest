import { createAction } from 'typesafe-actions';
import type { FlashCardType } from 'types/models';

export const addCard = createAction('cards/ADD_CARD', (card: FlashCardType) => card)();
