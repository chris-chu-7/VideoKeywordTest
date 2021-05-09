import { ActionType } from 'typesafe-actions';
// Dependency cycle due to recursive type,
// and this does not affect the runtime of the code.
/* eslint-disable import/no-cycle */
import * as pages from './pages';
import * as cards from './cards';
import * as transcript from './transcript';
/* eslint-enable import/no-cycle */

export const actions = { pages, cards, transcript };

export type RootAction = ActionType<typeof actions>;
