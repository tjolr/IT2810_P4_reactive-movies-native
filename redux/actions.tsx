import {
  UPDATE_SEARCH_FIELD,
  CHANGE_PAGE,
  UPDATE_RELEASE_YEAR,
  UPDATE_RATING,
  UPDATE_SORT,
  SET_SEARCH_IS_LOADING,
} from './actionTypes';

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

export const updateSort = (content: any) => ({
  type: UPDATE_SORT,
  /* Setting default sort if no sort is made */
  payload: {
    field: content ? content.field : 'popularity',
    sort: content ? content.sort : 'desc',
  },
});

export const setSearchIsLoading = (loading: boolean) => ({
  type: SET_SEARCH_IS_LOADING,
  payload: {
    loading,
  },
});
