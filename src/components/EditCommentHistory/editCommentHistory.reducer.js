import * as types from '../../actionTypes';

const commentEditHistoryReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_COMMENT_EDIT_HISTORY_START:
      return {
        ...state,
        isLoading: true
      };
    case types.GET_COMMENT_EDIT_HISTORY:
      return {
        ...state,
        history: action.payload,
        isLoading: false
      };
    case types.CLEAN_UP_COMMENT_EDIT_HISTORY:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};
export default commentEditHistoryReducer;
