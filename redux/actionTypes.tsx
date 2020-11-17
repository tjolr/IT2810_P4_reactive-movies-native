export const UPDATE_SEARCH_FIELD = 'UPDATE_SEARCH_FIELD';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const UPDATE_RELEASE_YEAR = 'UPDATE_RELEASE_YEAR';
export const UPDATE_RATING = 'UPDATE_RATING';
export const UPDATE_SORT = 'UPDATE_SORT';
export const SET_SEARCH_IS_LOADING = 'SET_SEARCH_IS_LOADING';
export const SET_TOTAL_ROW_COUNT = 'SET_TOTAL_ROW_COUNT';
export const HAS_PENDING_CHANGES = 'HAS_PENDING_CHANGES';

type MovieActionTypes =
  | typeof UPDATE_RATING
  | typeof UPDATE_RELEASE_YEAR
  | typeof UPDATE_SEARCH_FIELD
  | typeof CHANGE_PAGE
  | typeof UPDATE_SORT
  | typeof SET_SEARCH_IS_LOADING
  | typeof SET_TOTAL_ROW_COUNT;
export interface MovieAction {
  type: MovieActionTypes;
  payload: any;
}

type ReviewActionTypes = typeof HAS_PENDING_CHANGES;

export interface ReviewAction {
  type: ReviewActionTypes;
  payload: any;
}
