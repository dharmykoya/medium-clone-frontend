import axios from 'axios';
import * as actionTypes from '../../actionTypes/index';

export const getCommentOnArticleStart = () => {
  return {
    type: actionTypes.GET_COMMENT_ON_ARTICLE_START
  };
};

export const getCommentOnArticleSuccess = allComment => {
  return {
    type: actionTypes.GET_COMMENT_ON_ARTICLE_SUCCESS,
    allComment
  };
};

export const likeCommentSuccess = comment => {
  return {
    type: actionTypes.LIKE_COMMENT_ON_ARTICLE_SUCCESS,
    comment
  };
};

export const getCommentOnArticles = slug => {
  return dispatch => {
    dispatch(getCommentOnArticleStart());
    return axios
      .get(
        `https://persephone-backend-staging.herokuapp.com/api/v1/articles/${slug}/comments`
      )
      .then(response => {
        const { data } = response.data;
        data.comments.reverse();
        dispatch(getCommentOnArticleSuccess(data));
      });
  };
};

export const likeComment = (slug, commentId, token) => {
  return dispatch => {
    dispatch(getCommentOnArticleStart());
    return axios
      .get(
        `https://persephone-backend-staging.herokuapp.com/api/v1/articles/${slug}/comments/${commentId}/reactions`,

        {
          headers: { authorization: `Bearer ${token}` }
        }
      )
      .then(response => {
        const { data } = response.data;
        dispatch(likeCommentSuccess(data.likeCount.count));
      });
  };
};
