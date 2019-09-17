import {
  GET_COMMENT_ON_ARTICLE_START,
  GET_COMMENT_ON_ARTICLE_SUCCESS,
  LIKE_COMMENT_ON_ARTICLE_SUCCESS
} from '../../actionTypes/index';

import { updateObject } from '../../utils/helper';

const initialState = {
  allComment: null,
  loading: false,
  commentLiked: null
};

const allCommentOnArticleStart = state => {
  return updateObject(state, {
    loading: true
  });
};

const allCommentOnArticleSuccess = (state, action) => {
  return updateObject(state, {
    allComment: action.allComment,
    loading: false
  });
};

const likeCommentSuccess = (state, action) => {
  return updateObject(state, {
    commentLiked: action.comment,
    loading: false
  });
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENT_ON_ARTICLE_START:
      return allCommentOnArticleStart(state, action);
    case GET_COMMENT_ON_ARTICLE_SUCCESS:
      return allCommentOnArticleSuccess(state, action);
    case LIKE_COMMENT_ON_ARTICLE_SUCCESS:
      return likeCommentSuccess(state, action);

    default:
      return state;
  }
};
