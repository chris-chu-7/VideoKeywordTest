import { RootAction } from 'store/actions';
import { loadTranscript } from 'store/actions/transcript';
import { Word } from 'types/models';
import { getType } from 'typesafe-actions';

type State = {
  words: Word[];
  isRequesting: boolean;
};

const initialState: State = {
  words: [],
  isRequesting: false,
};

const reducer = (state: State = initialState, action: RootAction): State => {
  switch (action.type) {
    case getType(loadTranscript.request):
      return { ...state, isRequesting: true };
    case getType(loadTranscript.success):
      return { ...state, isRequesting: false, words: action.payload.transcript };
    case getType(loadTranscript.failure):
      return { ...state, isRequesting: false };
    default:
      return state;
  }
};

export default reducer;
