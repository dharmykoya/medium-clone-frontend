import * as types from '../../actionTypes';
import {
  GET_BOOKMARKED_ARTICLES_START,
  GET_BOOKMARKED_ARTICLES_SUCCESS,
  REMOVE_BOOKMARK_SUCCESS,
  ERROR_RESPONSE_ON_ARTICLE
} from '../../actionTypes/index';

import { updateObject } from '../../utils/helper';

const initialState = {
  bookmarkedArticles: null,
  loading: false,
  removeBookmarkMessageSuccess: null,
  error: null
};

const getBookmarkedArticlesStart = state => {
  return updateObject(state, {
    loading: true
  });
};

const getBookmarkedArticlesSuccess = (state, action) => {
  return updateObject(state, {
    bookmarkedArticles: action.bookmarkedArticles,
    loading: false
  });
};

const removeBookmarkSuccess = (state, action) => {
  return updateObject(state, {
    removeBookmarkMessageSuccess: action.message,
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
    case GET_BOOKMARKED_ARTICLES_START:
      return getBookmarkedArticlesStart(state, action);
    case GET_BOOKMARKED_ARTICLES_SUCCESS:
      return getBookmarkedArticlesSuccess(state, action);
    case REMOVE_BOOKMARK_SUCCESS:
      return removeBookmarkSuccess(state, action);
    case ERROR_RESPONSE_ON_ARTICLE:
      return errorResponse(state, action);
    case types.CREATE_BOOKMARK_SUCCESS:
      return { ...state, bookmarkCreated: action.payload };
    case types.CREATE_BOOKMARK_FAIL:
      return { ...state, bookmarkCreatedError: action.payload };

    default:
      return state;
  }
};

// export default (state = initialState, action) => {
//   switch (action.type) {
//     case GET_BOOKMARKED_ARTICLES_START:
//       return getBookmarkedArticlesStart(state, action);
//     case GET_BOOKMARKED_ARTICLES_SUCCESS:
//       return getBookmarkedArticlesSuccess(state, action);
//     case REMOVE_BOOKMARK_SUCCESS:
//       return removeBookmarkSuccess(state, action);
//     case ERROR_RESPONSE_ON_ARTICLE:
//       return errorResponse(state, action);

//     default:
//       return state;
//   }
// };

// const bookmarkReducer = (state = {}, action) => {
//   switch (action.type) {
//     case types.CREATE_BOOKMARK_SUCCESS:
//       return { ...state, bookmarkCreated: action.payload };
//     case types.CREATE_BOOKMARK_FAIL:
//       return { ...state, bookmarkCreatedError: action.payload };
//     case types.DELETE_BOOKMARK_SUCCESS:
//       return { ...state, bookmarkDeleted: action.payload };
//     case types.DELETE_BOOKMARK_FAIL:
//       return { ...state, bookmarkDeletedError: action.payload };
//     case types.GET_ALL_BOOKMARKS_SUCCESS:
//       return { ...state, allUserBookmark: action.payload };
//     case types.GET_ALL_BOOKMARKS_FAIL:
//       return { ...state, allUserBookmarkError: action.payload };
//     default:
//       return state;
//   }
// };
// export default bookmarkReducer;

// const bookmarkReducer = (state = {}, action) => {
//   switch (action.type) {
//     case types.CREATE_BOOKMARK_SUCCESS:
//       return { ...state, bookmarkCreated: action.payload };
//     case types.CREATE_BOOKMARK_FAIL:
//       return { ...state, bookmarkCreatedError: action.payload };
//     case types.DELETE_BOOKMARK_SUCCESS:
//       return { ...state, bookmarkDeleted: action.payload };
//     case types.DELETE_BOOKMARK_FAIL:
//       return { ...state, bookmarkDeletedError: action.payload };
//     case types.GET_ALL_BOOKMARKS_SUCCESS:
//       return { ...state, allUserBookmark: action.payload };
//     case types.GET_ALL_BOOKMARKS_FAIL:
//       return { ...state, allUserBookmarkError: action.payload };
//     default:
//       return state;
//   }
// };
// export default bookmarkReducer;
