import {
  GET_SINGLE_ARTICLE_SUCCESS,
  GET_SINGLE_ARTICLE_START,
  RATE_ARTICLE,
  RATE_ARTICLE_ERROR,
  CLEAN_UP_RATING,
  FOLLOW_AUTHOR,
  CLEAN_UP_FOLLOW
} from '../../actionTypes/index';

import { updateObject } from '../../utils/helper';

const initialState = {
  article: null,
  loading: false
};

const getSingleArticleStart = state => {
  return updateObject(state, {
    loading: true
  });
};

const getSingleArticleSuccess = (state, action) => {
  return updateObject(state, {
    article: action.article,
    loading: false
  });
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_ARTICLE_START:
      return getSingleArticleStart(state, action);
    case GET_SINGLE_ARTICLE_SUCCESS:
      return getSingleArticleSuccess(state, action);
    case RATE_ARTICLE:
      return {
        ...state,
        article: {
          ...state.article,
          rating: {
            ...state.article.rating,
            ratingResponse: action.payload
          }
        }
      };
    case RATE_ARTICLE_ERROR:
      return {
        ...state,
        article: {
          ...state.article,
          rating: {
            ...state.article.rating,
            ratingResponse: action.payload
          }
        }
      };

    case CLEAN_UP_RATING:
      return {
        ...state,
        article: {
          ...state.article,
          rating: {
            ratingResponse: action.payload
          }
        }
      };
    case FOLLOW_AUTHOR:
      return {
        ...state,
        article: {
          ...state.article,
          follow: {
            ...state.article.follow,
            followResponse: action.payload
          }
        }
      };
    case CLEAN_UP_FOLLOW:
      return {
        ...state,
        article: {
          ...state.article,
          follow: {
            ...state.article.follow,
            followResponse: action.payload
          }
        }
      };
    default:
      return state;
  }
};
