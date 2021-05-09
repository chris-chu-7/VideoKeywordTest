import { loadTranscript } from 'store/actions/transcript';
import { call, takeEvery } from 'typed-redux-saga';
import { ActionType, getType } from 'typesafe-actions';
import { api } from 'utils/api';
import { typedPut } from './utils';

function* loadTranscriptRequestSaga({
  payload: { url },
}: ActionType<typeof loadTranscript.request>) {
  try {
    const {
      data: { words },
    } = yield* call(api.getTranscript, url);

    yield* typedPut(
      loadTranscript.success(
        words.map((w) => ({
          startTime: Number(w.startTime.match(/(.*)s/)?.[1]),
          endTime: Number(w.endTime.match(/(.*)s/)?.[1]),
          word: w.word,
        })),
      ),
    );
  } catch (error) {
    if (error.response) {
      // Request made and server responded
      // eslint-disable-next-line no-console
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      yield* typedPut(loadTranscript.failure(Error(JSON.stringify(error.response.data))));
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
      yield* typedPut(loadTranscript.failure(Error(JSON.stringify(error.request))));
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
      yield* typedPut(loadTranscript.failure(Error(JSON.stringify(error.message))));
    }
  }
}

export default function* () {
  yield takeEvery(getType(loadTranscript.request), loadTranscriptRequestSaga);
}
