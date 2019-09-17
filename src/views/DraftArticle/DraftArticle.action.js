import axios from 'axios';
import * as actionTypes from '../../actionTypes/index';
import { toast } from 'react-toastify';

export const getDraftArticlesStart = () => {
  return {
    type: actionTypes.GET_DRAFT_ARTICLES_START
  };
};

export const getDraftArticlesSuccess = draftArticles => {
  return {
    type: actionTypes.GET_DRAFT_ARTICLES_SUCCESS,
    draftArticles
  };
};

export const publishArticleSuccess = message => {
  return {
    type: actionTypes.PUBLISHED_ARTICLES_SUCCESS,
    message
  };
};

export const errorResponse = error => {
  return {
    type: actionTypes.ERROR_RESPONSE_ON_ARTICLE,
    error
  };
};

export const getDraftArticles = token => {
  return dispatch => {
    dispatch(getDraftArticlesStart());
    return axios
      .get(
        `https://persephone-backend-staging.herokuapp.com/api/v1/articles/draft`,
        {
          headers: { authorization: `Bearer ${token}` }
        }
      )
      .then(response => {
        const { data } = response.data;
        dispatch(getDraftArticlesSuccess(data.reverse()));
      })
      .catch(error => {
        dispatch(errorResponse(error.response.data));
      });
  };
};

export const publishArticle = (slug, token) => {
  return dispatch => {
    dispatch(getDraftArticlesStart());
    return axios
      .put(
        `https://persephone-backend-staging.herokuapp.com/api/v1/articles/publish/${slug}`,
        null,
        {
          headers: { authorization: `Bearer ${token}` }
        }
      )
      .then(response => {
        const { data } = response.data;
        toast.success(data.message);
        dispatch(publishArticleSuccess(data.message));
      })
      .catch(error => {
        dispatch(errorResponse(error.response.data));
      });
  };
};
