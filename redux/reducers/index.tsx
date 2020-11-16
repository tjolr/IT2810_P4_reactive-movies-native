import { combineReducers } from 'redux';
import movieReducer from './movie.reducer';
import reviewReducer from './review.reducer';

export default combineReducers({ movieReducer, reviewReducer });
