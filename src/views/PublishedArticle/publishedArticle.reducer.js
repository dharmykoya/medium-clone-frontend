import {
  GET_PUBLISHED_ARTICLES_START,
  GET_PUBLISHED_ARTICLES_SUCCESS,
  UNPUBLISHED_ARTICLES_SUCCESS,
  ERROR_RESPONSE_ON_ARTICLE
} from '../../actionTypes/index';

import { updateObject } from '../../utils/helper';

const initialState = {
  publishedArticles: null,
  loading: false,
  unpublishMessageSuccess: null,
  error: null
};

const getPublishedArticlesStart = state => {
  return updateObject(state, {
    loading: true
  });
};

const getPublishedArticlesSuccess = (state, action) => {
  return updateObject(state, {
    publishedArticles: action.publishedArticles,
    loading: false
  });
};

const unPublishArticlesSuccess = (state, action) => {
  return updateObject(state, {
    unpublishMessageSuccess: action.message,
    loading: false
  });
};

const errorResponse = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PUBLISHED_ARTICLES_START:
      return getPublishedArticlesStart(state, action);
    case GET_PUBLISHED_ARTICLES_SUCCESS:
      return getPublishedArticlesSuccess(state, action);
    case UNPUBLISHED_ARTICLES_SUCCESS:
      return unPublishArticlesSuccess(state, action);
    case ERROR_RESPONSE_ON_ARTICLE:
      return errorResponse(state, action);

    default:
      return state;
  }
};
