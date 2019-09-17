import axiosUtil from '../../utils/axiosConfig';
import * as actionTypes from '../../actionTypes/index';

export const updateComment = payload => {
  return {
    type: actionTypes.UPDATE_COMMENT,
    payload: { payload, isEdited: true }
  };
};

export const updateCommentRequest = (slug, commentId, comment, token) => {
  return async dispatch => {
    const response = await axiosUtil.patch(
      `articles/${slug}/comments/${commentId}/edit`,
      { comment },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    dispatch(updateComment(response.data.data));
  };
};
