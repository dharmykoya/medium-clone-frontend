import axios from 'axios';
import * as actionTypes from '../../actionTypes/index';
import { toast } from 'react-toastify';

export const createBookmarkSuccess = bookmark => {
  return {
    type: actionTypes.CREATE_BOOKMARK_SUCCESS,
    payload: bookmark
  };
};
export const createBookmarkFail = error => {
  return {
    type: actionTypes.CREATE_BOOKMARK_FAIL,
    payload: error
  };
};
export const getBookmarkedArticlesStart = () => {
  return {
    type: actionTypes.GET_BOOKMARKED_ARTICLES_START
  };
};

export const getBookmarkedArticlesSuccess = bookmarkedArticles => {
  return {
    type: actionTypes.GET_BOOKMARKED_ARTICLES_SUCCESS,
    bookmarkedArticles
  };
};

export const removeBookmarkSuccess = message => {
  return {
    type: actionTypes.REMOVE_BOOKMARK_SUCCESS,
    message
  };
};

export const errorResponse = error => {
  return {
    type: actionTypes.ERROR_RESPONSE_ON_ARTICLE,
    error
  };
};

export const getbookmarkedArticles = token => {
  return dispatch => {
    dispatch(getBookmarkedArticlesStart());
    return axios
      .get(
        'https://persephone-backend-staging.herokuapp.com/api/v1/articles/bookmarks',
        {
          headers: { authorization: `Bearer ${token}` }
        }
      )
      .then(response => {
        const { data } = response.data;
        dispatch(getBookmarkedArticlesSuccess(data.bookmarks.reverse()));
      })
      .catch(error => {
        dispatch(errorResponse(error.response.data));
      });
  };
};

export const removeBookmark = (slug, token) => {
  return dispatch => {
    dispatch(getBookmarkedArticlesStart());
    return axios
      .delete(
        `https://persephone-backend-staging.herokuapp.com/api/v1/articles/${slug}/bookmarks`,
        {
          headers: { authorization: `Bearer ${token}` }
        }
      )
      .then(response => {
        const { data } = response.data;
        toast.success(data.message);
        dispatch(removeBookmarkSuccess(data.message));
      })
      .catch(error => {
        dispatch(errorResponse(error.response.data));
      });
  };
};

export const createBookmark = (slug, token) => {
  if (!token) {
    toast.error('Please sign in to bookmark this article');
  }
  return async dispatch => {
    try {
      const response = await axios.post(
        `https://persephone-backend-staging.herokuapp.com/api/v1/articles/${slug}/bookmarks`,
        null,
        {
          headers: { authorization: `Bearer ${token}` }
        }
      );
      if (response.status === 201) {
        toast.success(response.data.data.message);
        dispatch(createBookmarkSuccess(response.data.data.message));
      }
    } catch (error) {
      toast.error(error.response.data.data.message);
      dispatch(createBookmarkFail(error.response.data.data.message));
    }
  };
};
