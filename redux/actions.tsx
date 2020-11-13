import {
  UPDATE_SEARCH_FIELD,
  CHANGE_PAGE,
  UPDATE_RELEASE_YEAR,
  UPDATE_RATING,
  UPDATE_SORT,
  SET_SEARCH_IS_LOADING,
} from './actionTypes';
import { defaultSort, ISort } from './models/movieReducer.model';

/* Actions for updating the movie queries */

export const updateSearch = (content: string) => ({
  type: UPDATE_SEARCH_FIELD,
  payload: {
    content,
  },
});

export const changePage = (content: number) => ({
  type: CHANGE_PAGE,
  payload: {
    content,
  },
});

export const updateReleaseYear = (content: number[]) => ({
  type: UPDATE_RELEASE_YEAR,
  payload: {
    content,
  },
});

export const updateRating = (content: number[]) => ({
  type: UPDATE_RATING,
  payload: {
    content,
  },
});

export const updateSort = (content: ISort) => ({
  type: UPDATE_SORT,
  /* Setting default sort if no sort is made */
  payload: {
    field: content.field !== null ? content.field : defaultSort.field,
    sort:
      content.direction !== null ? content.direction : defaultSort.direction,
  },
});

export const setSearchIsLoading = (loading: boolean) => ({
  type: SET_SEARCH_IS_LOADING,
  payload: {
    loading,
  },
});
