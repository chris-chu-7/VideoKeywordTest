import { RootAction } from 'store/actions';
import { addCard } from 'store/actions/cards';
import { FlashCardType as CardType } from 'types/models';
import { getType } from 'typesafe-actions';

type State = {
  cards: CardType[];
};

const initialState: State = {
  cards: [],
};

const reducer = (state: State = initialState, action: RootAction): State => {
  switch (action.type) {
    case getType(addCard):
      return { ...state, cards: [...state.cards, action.payload] };
    default:
      return state;
  }
};

export default reducer;
