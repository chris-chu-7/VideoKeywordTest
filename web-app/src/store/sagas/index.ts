import { all } from 'typed-redux-saga';
import transcript from './transcript';

export default function* rootSaga() {
  yield* all([transcript()]);
}
