import axiosUtil from '../../utils/axiosConfig';
import * as actionTypes from '../../actionTypes/index';

export const getCommentEditHistory = payload => {
  return { type: actionTypes.GET_COMMENT_EDIT_HISTORY, payload };
};

export const getCommentEditHistoryStart = () => {
  return { type: actionTypes.GET_COMMENT_EDIT_HISTORY_START };
};

export const cleanUpEditHistory = () => {
  return { type: actionTypes.CLEAN_UP_COMMENT_EDIT_HISTORY };
};
export const getEditHistoryRequest = (slug, commentId, token) => {
  return async dispatch => {
    dispatch(cleanUpEditHistory());
    dispatch(getCommentEditHistoryStart());
    const response = await axiosUtil.get(
      `articles/${slug}/comments/${commentId}/history`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    dispatch(getCommentEditHistory(response.data.data));
  };
};
