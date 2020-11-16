import { HAS_PENDING_CHANGES } from '../actionTypes';

const initReviewState = {
  hasPendingChanges: false,
};

const reviewReducer = (state = initReviewState, action: any) => {
  switch (action.type) {
    case HAS_PENDING_CHANGES:
      return {
        hasPendingChanges: action.payload.hasPendingChanges,
      };
    default:
      return state;
  }
};

export default reviewReducer;
