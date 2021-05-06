import { ActionType } from 'typesafe-actions';
// Dependency cycle due to recursive type,
// and this does not affect the runtime of the code.
/* eslint-disable import/no-cycle */
import * as pages from './pages';
/* eslint-enable import/no-cycle */

export const actions = { pages };

export type RootAction = ActionType<typeof actions>;
