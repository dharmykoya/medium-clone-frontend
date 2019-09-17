import axios from 'axios';
import * as actionTypes from '../../actionTypes/index';
import { toast } from 'react-toastify';

export const getPublishedArticlesStart = () => {
  return {
    type: actionTypes.GET_PUBLISHED_ARTICLES_START
  };
};

export const getPublishedArticlesSuccess = publishedArticles => {
  return {
    type: actionTypes.GET_PUBLISHED_ARTICLES_SUCCESS,
    publishedArticles
  };
};

export const unpublishArticleSuccess = message => {
  return {
    type: actionTypes.UNPUBLISHED_ARTICLES_SUCCESS,
    message
  };
};

export const errorResponse = error => {
  return {
    type: actionTypes.ERROR_RESPONSE_ON_ARTICLE,
    error
  };
};

export const getPublishedArticles = token => {
  return dispatch => {
    dispatch(getPublishedArticlesStart());
    return axios
      .get(
        'https://persephone-backend-staging.herokuapp.com/api/v1/articles/publish',
        {
          headers: { authorization: `Bearer ${token}` }
        }
      )
      .then(response => {
        const { data } = response.data;
        dispatch(getPublishedArticlesSuccess(data.reverse()));
      })
      .catch(error => {
        dispatch(errorResponse(error.response.data));
      });
  };
};

export const unpublishArticle = (slug, token) => {
  return dispatch => {
    dispatch(getPublishedArticlesStart());
    return axios
      .put(
        `https://persephone-backend-staging.herokuapp.com/api/v1/articles/unpublish/${slug}`,
        null,
        {
          headers: { authorization: `Bearer ${token}` }
        }
      )
      .then(response => {
        const { data } = response.data;
        toast.success(data.message);
        dispatch(unpublishArticleSuccess(data.message));
      })
      .catch(error => {
        dispatch(errorResponse(error.response.data));
      });
  };
};
