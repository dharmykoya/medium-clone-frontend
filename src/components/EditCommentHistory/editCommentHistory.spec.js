import React from 'react';
import '@babel/polyfill';
import mockAxios from 'axios';
import { shallow } from 'enzyme';
import editCommentHistoryReducer from './editCommentHistory.reducer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getEditHistoryRequest } from './editCommentHistory.action';
import { EditCommentHistory } from './index.jsx';
import {
  GET_COMMENT_EDIT_HISTORY,
  GET_COMMENT_EDIT_HISTORY_START,
  CLEAN_UP_COMMENT_EDIT_HISTORY
} from '../../actionTypes/index';
import Loader from '../LoadingIndicator/index.jsx';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const slug = 'How-To-Become-a-10x-Engineer';
const comment = 'Some new comment';
const token = 'jndmfdfdfdfkldk';
const response = {
  '6:00pm, 12th August 2030': 'previous comment',
  '6:01pm, 12th August 2030': 'another comment',
  '6:03pm, 12th August 2030': 'another comment'
};

describe('Edit comment History actions tests', () => {
  let store;
  beforeEach(() => {
    store = mockStore({});
    jest.resetAllMocks();
  });
  afterEach(() => {
    store.clearActions();
  });

  it('Should dispatch The UPDATE_COMMENT action', async () => {
    const mockData = {
      data: {
        data: {
          response
        }
      }
    };

    mockAxios.get.mockResolvedValue({
      data: mockData.data
    });

    const expectedActions = [
      { type: 'CLEAN_UP_COMMENT_EDIT_HISTORY' },
      { type: 'GET_COMMENT_EDIT_HISTORY_START' },
      {
        type: 'GET_COMMENT_EDIT_HISTORY',
        payload: {
          response
        }
      }
    ];

    await store.dispatch(getEditHistoryRequest(slug, comment, token));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('Get Comment Edit History Reducer Tests', () => {
  const initialState = {};
  it('Should return a new state if it recieves a GET_COMMENT_EDIT_HISTORY_START action type', () => {
    const newState = editCommentHistoryReducer(initialState, {
      type: GET_COMMENT_EDIT_HISTORY_START,
      payload: {}
    });
    expect(newState).toEqual({
      isLoading: true
    });
  });

  it('Should return a new state if it recieves a GET_COMMENT_EDIT_HISTORY action type', () => {
    const newState = editCommentHistoryReducer(initialState, {
      type: GET_COMMENT_EDIT_HISTORY,
      payload: response
    });
    expect(newState).toEqual({
      isLoading: false,
      history: response
    });
  });

  it('Should return a new state if it recieves a CLEAN_UP_COMMENT_EDIT_HISTORY action type', () => {
    const newState = editCommentHistoryReducer(initialState, {
      type: CLEAN_UP_COMMENT_EDIT_HISTORY,
      payload: {}
    });
    expect(newState).toEqual({
      isLoading: false
    });
  });
});

describe('EditCommentHistory Template', () => {
  it(`should render the EditCommentHistory Template when there is no edit history`, () => {
    const props = {
      commentHistory: {
        history: {
          commentEditHistory: {}
        }
      },
      isLoading: false
    };
    const component = shallow(<EditCommentHistory {...props} />);
    expect(
      component
        .find('.comment-edit-history')
        .contains(
          <h5 className="pt-5 text-center">This comment has no edit history</h5>
        )
    ).toBeTruthy();
  });

  it(`should render the EditCommentHistory Template when the request is loading`, () => {
    const props = {
      commentHistory: {
        history: {
          commentEditHistory: { response }
        }
      },
      isLoading: true
    };
    const component = shallow(<EditCommentHistory {...props} />);
    expect(
      component.find('.comment-edit-history').contains(<Loader />)
    ).toBeTruthy();
  });
});
