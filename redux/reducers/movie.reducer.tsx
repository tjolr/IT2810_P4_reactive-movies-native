import {
  UPDATE_SEARCH_FIELD,
  CHANGE_PAGE,
  UPDATE_RELEASE_YEAR,
  UPDATE_RATING,
  UPDATE_SORT,
  SET_SEARCH_IS_LOADING,
  SET_TOTAL_ROW_COUNT,
} from '../actionTypes';
import { IMovieState } from '../models/movieReducer.model';

/* Initial movie state
Also used in the cypress testing, and therefore it needs to be exported */
export const initMovieState: IMovieState = {
  searchString: '',
  pagination: {
    page: 1,
    pageInterval: [1, 25],
    totalPages: 0,
    totalRowCount: 0,
  },
  filter: {
    rating: {
      from: 0,
      to: 10,
    },
    release_year: {
      from: 1916,
      to: 2020,
    },
  },
  sort: {
    field: 'popularity',
    direction: 'desc',
  },
  searchIsLoading: false,
};

/* Movie Reducer
Many times when filters, sorts or search is changed the user wants to 
see the best results for its search. Therefore many times the page is 
set to the first page. */
const movieReducer = (state = initMovieState, action: any) => {
  switch (action.type) {
    case UPDATE_SEARCH_FIELD:
      return {
        ...state,
        searchString: action.payload.content,
        searchIsLoading: action.payload.content ? true : false,
      };
    case CHANGE_PAGE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          page: action.payload.page,
          pageInterval: action.payload.pageInterval,
        },
      };
    case UPDATE_RELEASE_YEAR:
      return {
        ...state,
        filter: {
          /* Important use of spread operator here
          to also remain the nested childs of the state
          and not replace two children with one new child */
          ...state.filter,
          release_year: {
            from: action.payload.content[0],
            to: action.payload.content[1],
          },
        },
      };
    case UPDATE_RATING:
      return {
        ...state,
        filter: {
          /* Important use of spread operator here
          to also remain the nested childs of the state
          and not replace two children with one new child */
          ...state.filter,
          rating: {
            from: action.payload.content[0],
            to: action.payload.content[1],
          },
        },
      };
    case UPDATE_SORT:
      return {
        ...state,
        sort: {
          field: action.payload.field,
          direction: action.payload.sort,
        },
      };
    case SET_SEARCH_IS_LOADING:
      return {
        ...state,
        searchIsLoading: action.payload.loading,
      };
    case SET_TOTAL_ROW_COUNT:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          totalRowCount: action.payload.totalRowCount,
          totalPages: action.payload.totalPages,
        },
      };
    default:
      return state;
  }
};

export default movieReducer;
