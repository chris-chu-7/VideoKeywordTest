import { Dispatch } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootAction } from 'store/actions';
import { RootState } from 'store/reducers';

export type TypedThunkDispatch = ThunkDispatch<RootState, unknown, RootAction>;
export type TypedDispatch = Dispatch<RootAction>;
export type TypedThunkAction = ThunkAction<
  void,
  RootState,
  unknown,
  RootAction
>;

export type TypedSelector<TSelected = unknown> = (
  state: RootState
) => TSelected;
