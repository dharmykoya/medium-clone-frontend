import * as types from '../../actionTypes';
import initialState from '../../store/initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_ALL_ARTICLES:
      return {
        ...state,
        allArticles: action.payload,
        isLoading: false
      };
    case types.UPDATE_ARTICLES_LOADING:
      return {
        ...state,
        articlesLoading: action.payload,
        isLoading: true
      };
    case types.ADD_ALL_TAGS:
      return {
        ...state,
        allTags: action.payload,
        isLoading: false
      };
    case types.UPDATE_EMPTY_NARROWED:
      return {
        ...state,
        isNarrowedArticleEmpty: action.payload
      };
    case types.FETCH_ALL_ARTICLES:
      return { ...state, articles: action.payload, isLoading: false };
    case types.FETCH_MORE_ARTICLES:
      return { ...state, articles: action.payload, isLoading: false };
    case types.FETCH_ALL_ARTICLES_START:
      return { ...state, isLoading: true };
    default:
      return state;
  }
};
