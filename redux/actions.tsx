import {
  UPDATE_SEARCH_FIELD,
  CHANGE_PAGE,
  UPDATE_RELEASE_YEAR,
  UPDATE_RATING,
  UPDATE_SORT,
  SET_SEARCH_IS_LOADING,
  SET_TOTAL_ROW_COUNT,
  HAS_PENDING_CHANGES,
} from './actionTypes';
import { defaultSort, ISort, rowsPerPage } from './models/movieReducer.model';
import store from './store';

export interface Action {
  type: string;
  payload: any;
}

/* Actions for updating the movie queries */

export const updateSearch = (content: string): Action => {
  // want to show the best matches for the search
  // therefore we dispatch action to set page to 1
  store.dispatch(changePage(1));
  return {
    type: UPDATE_SEARCH_FIELD,
    payload: {
      content,
    },
  };
};

export const changePage = (page: number): Action => {
  // The pageInterval shows which of total rows that are display
  let pageInterval = [(page - 1) * rowsPerPage + 1, page * rowsPerPage];

  return {
    type: CHANGE_PAGE,
    payload: {
      page,
      pageInterval,
    },
  };
};

export const updateReleaseYear = (content: number[]): Action => {
  store.dispatch(changePage(1));
  return {
    type: UPDATE_RELEASE_YEAR,
    payload: {
      content,
    },
  };
};

export const updateRating = (content: number[]): Action => {
  store.dispatch(changePage(1));
  return {
    type: UPDATE_RATING,
    payload: {
      content,
    },
  };
};

export const updateSort = (content: ISort): Action => {
  store.dispatch(changePage(1));
  return {
    type: UPDATE_SORT,
    /* Setting default sort if no sort is made */
    payload: {
      field: content.field !== null ? content.field : defaultSort.field,
      sort:
        content.direction !== null ? content.direction : defaultSort.direction,
    },
  };
};

export const setSearchIsLoading = (loading: boolean): Action => ({
  type: SET_SEARCH_IS_LOADING,
  payload: {
    loading,
  },
});

export const setTotalRowCount = (totalRowCount: number): Action => {
  const totalPages = Math.ceil(totalRowCount / rowsPerPage);

  return {
    type: SET_TOTAL_ROW_COUNT,
    payload: {
      totalRowCount,
      totalPages,
    },
  };
};

export const setReviewHasPendingChanges = (
  hasPendingChanges: boolean
): Action => {
  return {
    type: HAS_PENDING_CHANGES,
    payload: {
      hasPendingChanges,
    },
  };
};
