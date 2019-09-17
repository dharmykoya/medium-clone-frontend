import {
  CREATE_COMMENT_ON_ARTICLE_START,
  CREATE_COMMENT_ON_ARTICLE_SUCCESS
} from '../../actionTypes/index';

import { updateObject } from '../../utils/helper';

const initialState = {
  comment: null,
  loading: false
};

const createCommentOnArticleStart = state => {
  return updateObject(state, {
    loading: true
  });
};

const createCommentOnArticleSuccess = (state, action) => {
  return updateObject(state, {
    comment: action.comment,
    loading: false
  });
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_COMMENT_ON_ARTICLE_START:
      return createCommentOnArticleStart(state, action);
    case CREATE_COMMENT_ON_ARTICLE_SUCCESS:
      return createCommentOnArticleSuccess(state, action);

    default:
      return state;
  }
};
