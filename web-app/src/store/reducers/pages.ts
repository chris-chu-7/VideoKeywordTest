import { Page } from 'constants/pages';
import { RootAction } from 'store/actions';
import { setPage } from 'store/actions/pages';
import { getType } from 'typesafe-actions';

type State = {
  currentPage: Page;
};

const initialState: State = {
  currentPage: Page.VIDEO,
};

const reducer = (state: State = initialState, action: RootAction): State => {
  switch (action.type) {
    case getType(setPage):
      return { ...state, currentPage: action.payload.page };
    default:
      return state;
  }
};

export default reducer;
