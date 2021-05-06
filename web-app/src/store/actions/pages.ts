import { Page } from 'constants/pages';
import { createAction } from 'typesafe-actions';

export const setPage = createAction('pages/SET_PAGE', (page: Page) => ({
  page,
}))();
