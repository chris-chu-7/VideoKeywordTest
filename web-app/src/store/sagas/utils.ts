import { RootAction } from 'store/actions';
import { put, take } from 'typed-redux-saga';
import { getType } from 'typesafe-actions';

export const typedPut = (action: RootAction) => put<RootAction>(action);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const typedTake = <T extends (...args: any[]) => RootAction>(actionCreator: T) =>
  take<ReturnType<typeof actionCreator>>(getType(actionCreator));
