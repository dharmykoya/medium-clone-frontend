import axios from 'axios';
import * as actionTypes from '../../actionTypes/index';

export const createCommentOnArticleStart = () => {
  return {
    type: actionTypes.CREATE_COMMENT_ON_ARTICLE_START
  };
};

export const createCommentOnArticleSuccess = comment => {
  return {
    type: actionTypes.CREATE_COMMENT_ON_ARTICLE_SUCCESS,
    comment
  };
};

export const createCommentOnArticle = (slug, comment, token) => {
  return dispatch => {
    dispatch(createCommentOnArticleStart());
    return axios
      .post(
        `https://persephone-backend-staging.herokuapp.com/api/v1/articles/${slug}/comments`,
        comment,
        {
          headers: { authorization: `Bearer ${token}` }
        }
      )
      .then(response => {
        const { data } = response.data;
        dispatch(createCommentOnArticleSuccess(data));
      });
  };
};
