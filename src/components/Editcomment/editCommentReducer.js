import * as types from '../../actionTypes';

const editCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case types.UPDATE_COMMENT:
      return {
        ...state,
        updatedComment: action.payload
      };
    default:
      return state;
  }
};
export default editCommentReducer;
