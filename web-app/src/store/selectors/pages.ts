import { RootState } from 'store/reducers';

export const currentPageSelector = (state: RootState) => state.pages.currentPage;
