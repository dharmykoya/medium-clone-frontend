import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import mockAxios from 'axios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {
  fetchArticlesRequest,
  fetchMoreArticlesRequest,
  filterByTagsRequest,
  searchByTitleRequest,
  fetchAllTagsRequest
} from '../AllArticlesPage/index.action';
import { ArticlesPage, mapDispatchToProps } from './index.jsx';
import {
  FETCH_ALL_ARTICLES_START,
  FETCH_ALL_ARTICLES,
  FETCH_MORE_ARTICLES,
  ADD_ALL_ARTICLES,
  UPDATE_ARTICLES_LOADING,
  ADD_ALL_TAGS,
  UPDATE_EMPTY_NARROWED
} from '../../actionTypes/index';
import allArticlesReducer from '../AllArticlesPage/index.reducer';
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('ArtclesPage component Tests', () => {
  const renderAllArticlesPage = args => {
    const defaultProps = {
      theme: {
        theme: 'light-theme'
      },
      filterByTagsRequest: jest.fn(),
      searchByTitleRequest: jest.fn(),
      fetchAllTagsRequest: jest.fn(),
      fetchArticlesRequest: jest.fn(),
      fetchMoreArticlesRequest: jest.fn(),
      articles: { allTags: [], allArticles: [], articles: {} },
      history: {},
      match: {}
    };
    const props = { ...defaultProps, ...args };
    return mount(
      <BrowserRouter>
        <ArticlesPage {...props} />
      </BrowserRouter>
    );
  };

  it(`Simulates an onchange event on select input`, () => {
    const wrapper = renderAllArticlesPage();
    const selectInstance = wrapper.find('.select-component');
    selectInstance.forEach(instance => {
      instance.simulate('change', { value: 'startups' });
    });
  });

  it('Simulates a form submit event on search', () => {
    const wrapper = renderAllArticlesPage();
    wrapper.find('form').simulate('submit');
  });

  it('should dispatch fetchArticlesRequest action', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).fetchArticlesRequest();
  });
  it('should dispatch fetchMoreArticlesRequest action', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).fetchMoreArticlesRequest();
  });
  it('should dispatch searchByTitleRequest action', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).searchByTitleRequest();
  });
  it('should dispatch filterByTagsRequest action', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).filterByTagsRequest();
  });
  it('should dispatch fetchAllTagsRequest action', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).fetchAllTagsRequest();
  });
  it('should dispatch addAllArticles action', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).addAllArticles();
  });
});

describe('All articlesPage Actions Tests', () => {
  let store;
  beforeEach(() => {
    store = mockStore({});
    jest.resetAllMocks();
  });
  afterEach(() => {
    store.clearActions();
  });
  it('Should Trigger the FETCH_ALL_ARTICLES_START and FETCH_ALL_ARTICLES actions', async () => {
    const mockData = {
      data: { pageResponse: [], allArticles: [] }
    };
    mockAxios.get.mockResolvedValue({
      status: 200,
      data: mockData
    });

    const expectedActions = [
      { type: FETCH_ALL_ARTICLES_START },
      { type: FETCH_ALL_ARTICLES, payload: mockData.data }
    ];
    await store.dispatch(fetchArticlesRequest());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should Trigger the FETCH_MORE_ARTICLES action', async () => {
    const mockData = {
      data: { pageResponse: [], allArticles: [] }
    };
    mockAxios.get.mockResolvedValue({
      status: 200,
      data: mockData
    });

    const expectedActions = [
      { type: FETCH_MORE_ARTICLES, payload: mockData.data }
    ];
    store = mockStore({
      articles: {
        articles: {
          allArticles: []
        }
      }
    });
    await store.dispatch(fetchMoreArticlesRequest());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should Trigger the ADD_ALL_ARTICLES action on filterByTagsRequest function call ', async () => {
    const mockData = {
      data: { searchResult: [] }
    };
    mockAxios.get.mockResolvedValue({
      status: 200,
      data: mockData
    });

    const expectedActions = [
      { type: 'UPDATE_ARTICLES_LOADING' },
      { type: UPDATE_EMPTY_NARROWED, payload: true },
      { type: 'ADD_ALL_ARTICLES', payload: mockData.data.searchResult }
    ];
    await store.dispatch(filterByTagsRequest());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should Trigger the ADD_ALL_ARTICLES action on searchByTitleRequest function call', async () => {
    const mockData = {
      data: { searchResult: [] }
    };
    mockAxios.get.mockResolvedValue({
      status: 200,
      data: mockData
    });

    const expectedActions = [
      { type: 'UPDATE_ARTICLES_LOADING' },
      { type: 'UPDATE_EMPTY_NARROWED', payload: true },
      { type: 'ADD_ALL_ARTICLES', payload: mockData.data.searchResult }
    ];
    await store.dispatch(searchByTitleRequest('keyword'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should Trigger the ADD_ALL_TAGS action on fetchAllTagsRequest function call', async () => {
    const mockData = {
      data: { searchResult: [] }
    };
    mockAxios.get.mockResolvedValue({
      status: 200,
      data: mockData
    });

    const expectedActions = [{ type: 'ADD_ALL_TAGS', payload: mockData.data }];
    await store.dispatch(fetchAllTagsRequest());
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('Log In Reducer Tests', () => {
  const initialState = {
    allArticles: [],
    allTags: [],
    articles: {},
    isLoading: false,
    user: {}
  };
  it('Should return a new state if it recieves a FETCH_ALL_ARTICLES action type', () => {
    const mockData = {
      data: { pageResponse: [], allArticles: [] }
    };
    const newState = allArticlesReducer(initialState, {
      type: FETCH_ALL_ARTICLES,
      payload: mockData
    });
    expect(newState).toEqual({ ...initialState, articles: mockData });
  });

  it('Should return a new state if it recieves a FETCH_MORE_ARTICLES action type', () => {
    const mockData = {
      data: { pageResponse: [], allArticles: [] }
    };
    const newState = allArticlesReducer(initialState, {
      type: FETCH_MORE_ARTICLES,
      payload: mockData
    });
    expect(newState).toEqual({ ...initialState, articles: mockData });
  });

  it('Should return a new state if it recieves a FETCH_ALL_ARTICLES_START action type', () => {
    const newState = allArticlesReducer(initialState, {
      type: FETCH_ALL_ARTICLES_START
    });
    expect(newState).toEqual({ ...initialState, isLoading: true });
  });

  it('Should return a new state if it recieves a ADD_ALL_TAGS action type', () => {
    const mockData = {
      data: { searchResult: [] }
    };
    const newState = allArticlesReducer(initialState, {
      type: ADD_ALL_TAGS,
      payload: mockData
    });
    expect(newState).toEqual({
      ...initialState,
      allTags: mockData,
      isLoading: false
    });
  });

  it('Should return a new state if it recieves a UPDATE_ARTICLES_LOADING action type', () => {
    const newState = allArticlesReducer(initialState, {
      type: UPDATE_ARTICLES_LOADING
    });
    expect(newState).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('Should return a new state if it recieves a ADD_ALL_ARTICLES action type', () => {
    const mockData = {
      data: { searchResult: [] }
    };
    const newState = allArticlesReducer(initialState, {
      type: ADD_ALL_ARTICLES,
      payload: mockData
    });
    expect(newState).toEqual({
      ...initialState,
      allArticles: mockData,
      isLoading: false
    });
  });
});
