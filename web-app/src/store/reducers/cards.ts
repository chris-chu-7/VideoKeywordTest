import { RootAction } from 'store/actions';
import { addCard, setUrl } from 'store/actions/cards';
import { FlashCardType as CardType } from 'types/models';
import { getType } from 'typesafe-actions';

type State = {
  cards: CardType[];
  url?: string;
};

const initialState: State = {
  cards: [],
  url: undefined,
};

const reducer = (state: State = initialState, action: RootAction): State => {
  switch (action.type) {
    case getType(addCard):
      return { ...state, cards: [...state.cards, action.payload] };
    case getType(setUrl):
      return { ...state, url: action.payload };
    default:
      return state;
  }
};

export default reducer;
