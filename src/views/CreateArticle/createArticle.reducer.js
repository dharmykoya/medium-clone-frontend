import {
  CREATE_ARTICLE_START,
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_FAIL
} from '../../actionTypes/index';

const initialState = {
  loading: false,
  error: null,
  success: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ARTICLE_START:
      return {
        ...state,
        loading: true
      };
    case CREATE_ARTICLE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case CREATE_ARTICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload
      };
    default:
      return state;
  }
};
