import {
  GET_DRAFT_ARTICLES_START,
  GET_DRAFT_ARTICLES_SUCCESS,
  PUBLISHED_ARTICLES_SUCCESS,
  ERROR_RESPONSE_ON_ARTICLE
} from '../../actionTypes/index';

import { updateObject } from '../../utils/helper';

const initialState = {
  draftArticles: null,
  loading: false,
  publishMessageSuccess: null,
  error: null
};

const getDraftArticlesStart = state => {
  return updateObject(state, {
    loading: true
  });
};

const getDraftArticlesStartSuccess = (state, action) => {
  return updateObject(state, {
    draftArticles: action.draftArticles,
    loading: false
  });
};

const publishArticlesSuccess = (state, action) => {
  return updateObject(state, {
    publishMessageSuccess: action.message,
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
    case GET_DRAFT_ARTICLES_START:
      return getDraftArticlesStart(state, action);
    case GET_DRAFT_ARTICLES_SUCCESS:
      return getDraftArticlesStartSuccess(state, action);
    case PUBLISHED_ARTICLES_SUCCESS:
      return publishArticlesSuccess(state, action);
    case ERROR_RESPONSE_ON_ARTICLE:
      return errorResponse(state, action);

    default:
      return state;
  }
};
