import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import cards from './cards';
import transcript from './transcript';
import pages from './pages';

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    pages,
    cards,
    transcript,
  });

export default createRootReducer;

export type RootState = StateType<ReturnType<typeof createRootReducer>>;
