import type { Transcript } from 'types/models';
import { createAsyncAction } from 'typesafe-actions';

export const loadTranscript = createAsyncAction(
  [
    'transcript/LOAD_TRANSCRIPT_REQUEST',
    (url: string) => ({
      url,
    }),
  ],
  [
    'transcript/LOAD_TRANSCRIPT_SUCCESS',
    (transcript: Transcript) => ({
      transcript,
    }),
  ],
  ['transcript/LOAD_TRANSCRIPT_FAILURE', (error: Error) => ({ error })],
)();
