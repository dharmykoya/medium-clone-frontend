import React from 'react';
import '@babel/polyfill';
import mockAxios from 'axios';
import { shallow } from 'enzyme';
import readArticleReducer from './readArticle.reducer';
import loginReducer from '../LoginPage/login.reducer';
import configureStore from 'redux-mock-store';

import thunk from 'redux-thunk';
import {
  followAuthorRequest,
  getUserFollowersRequest
} from './readArticle.action';
import { ReadArticle, mapDispatchToProps } from './index.jsx';
import {
  FOLLOW_AUTHOR,
  CLEAN_UP_FOLLOW,
  GET_USER_FOLLOWERS
} from '../../actionTypes/index';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Follow functionality actions tests', () => {
  let store;
  beforeEach(() => {
    store = mockStore({});
    jest.resetAllMocks();
  });
  afterEach(() => {
    store.clearActions();
  });

  it('Should dispatch The FOLLOW_AUTHOR and CLEAN_UP_FOLLOW actions', async () => {
    const mockData = {
      data: {
        data: 'You have followed this user'
      }
    };

    mockAxios.post.mockResolvedValue({
      status: 200,
      data: mockData.data
    });

    const expectedActions = [
      {
        type: 'FOLLOW_AUTHOR',
        payload: 'You have followed this user'
      },
      { type: 'CLEAN_UP_FOLLOW', payload: null }
    ];

    await store.dispatch(followAuthorRequest({ id: 4, token: 'dnd' }));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should dispatch The GET_USER_FOLLOWERS action', async () => {
    const mockData = {
      data: {
        data: [
          { id: 1, userName: '@sammy' },
          { id: 2, userName: '@fola' },
          { id: 3, userName: '@tunde' },
          { id: 4, userName: '@halima' },
          { id: 5, userName: '@dammy' }
        ]
      }
    };

    mockAxios.get.mockResolvedValue({
      status: 200,
      data: mockData.data
    });

    const expectedActions = [
      {
        type: 'GET_USER_FOLLOWERS',
        payload: [
          { id: 1, userName: '@sammy' },
          { id: 2, userName: '@fola' },
          { id: 3, userName: '@tunde' },
          { id: 4, userName: '@halima' },
          { id: 5, userName: '@dammy' }
        ]
      }
    ];

    await store.dispatch(getUserFollowersRequest({ id: 6, token: 'dnd' }));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('Follow Reducer Tests', () => {
  const initialState = {
    article: { rating: {} },
    loading: false
  };
  it('Should return a new state if it recieves a FOLLOW_AUTHOR action type', () => {
    const followResponse = 'You have followed this user';
    const mockData = {
      followResponse
    };
    const newState = readArticleReducer(initialState, {
      type: FOLLOW_AUTHOR,
      payload: followResponse
    });
    expect(newState).toEqual({
      ...initialState,
      article: { ...initialState.article, follow: mockData }
    });
  });

  it('Should return a new state if it recieves a CLEAN_UP_FOLLOW action type', () => {
    const followResponse = null;
    const mockData = {
      followResponse
    };

    const newState = readArticleReducer(initialState, {
      type: CLEAN_UP_FOLLOW,
      payload: followResponse
    });
    expect(newState).toEqual({
      ...initialState,
      article: { ...initialState.article, follow: mockData }
    });
  });

  it('Should return a new state if it recieves a log in action type', () => {
    const followers = [
      { id: 1, userName: '@sammy' },
      { id: 2, userName: '@fola' },
      { id: 3, userName: '@tunde' },
      { id: 4, userName: '@halima' },
      { id: 5, userName: '@dammy' }
    ];
    const newState = loginReducer(undefined, {
      type: GET_USER_FOLLOWERS,
      payload: followers
    });
    expect(newState).toEqual({ followers });
  });
});

describe('ReadArticle Page', () => {
  const response = {
    status: 'success',
    data: {
      id: 19,
      title: 'how-to-build-high-performance-teams',
      userId: 5,
      description: null,
      body:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi commodo nisl eget neque aliquam',
      image:
        '{"0":"https://res.cloudinary.com/fxola/image/upload/v1565123296/post/bump-collaboration-colleagues-1068523.jpg.jpg"}',
      readTime: '1 min read',
      viewsCount: 1,
      slug: 'how-to-build-high-performance-teams-16',
      isPublished: true,
      publishedAt: '2019-08-06T20:47:09.975Z',
      isDeleted: false,
      createdAt: '2019-08-06T20:44:44.966Z',
      updatedAt: '2019-08-12T01:23:34.044Z',
      deletedAt: null,
      author: {
        firstName: 'Halimah',
        lastName: 'Oladosu',
        image:
          'https://res.cloudinary.com/fxola/image/upload/v1562006344/avatar.png'
      },
      Tags: [
        {
          name: 'product'
        },
        {
          name: 'design'
        }
      ],
      likesCount: 0,
      likers: [],
      rating: {
        totalNumberOfRatings: 0,
        sumOfRatings: 0,
        averageRating: 0
      }
    }
  };
  const defaultProps = {
    fetchSingleArticle: jest.fn(),
    likeArticle: jest.fn(),
    match: { params: 'risk-involved-in-business' },
    loading: false,
    user: {
      followers: []
    },
    article: response.data,
    lightTheme: true,
    handleLikes: jest.fn(),
    auth: {
      user: {
        token: ''
      }
    }
  };

  const state = {};

  it('should Follow an author', () => {
    const component = shallow(<ReadArticle {...defaultProps} {...state} />);
    const instance = component.instance();
    jest.spyOn(instance, 'handleFollow');
    instance.handleFollow();
    expect(instance.handleFollow).toHaveBeenCalled();
  });

  it('should call the checkIsFollowing component function', () => {
    const component = shallow(<ReadArticle {...defaultProps} {...state} />);
    const instance = component.instance();
    jest.spyOn(instance, 'checkIsFollowing');
    instance.checkIsFollowing();
    expect(instance.checkIsFollowing).toHaveBeenCalled();
  });

  it('should call the componentDidUpdate component function', () => {
    const component = shallow(<ReadArticle {...defaultProps} {...state} />);
    const instance = component.instance();
    jest.spyOn(instance, 'componentDidUpdate');
    instance.componentDidUpdate();
    expect(instance.componentDidUpdate).toHaveBeenCalled();
  });

  it('should dispatch followAuthorRequest action', async () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).followAuthorRequest();
  });
  it('should dispatch getUserFollowersRequest action', async () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).getUserFollowersRequest();
  });
});
