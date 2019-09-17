import React from 'react';
import '@babel/polyfill';
import mockAxios from 'axios';
import { shallow } from 'enzyme';
import editCommentReducer from './editCommentReducer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { updateCommentRequest } from './editComment.action';
import { EditCommentForm } from './index.jsx';
import { UPDATE_COMMENT } from '../../actionTypes/index';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const slug = 'How-To-Become-a-10x-Engineer';
const commentId = 44;
const comment = 'Some new comment';
const token = 'jndmfdfdfdfkldk';

describe('Edit comment action tests', () => {
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
          comment,
          message: 'Comment Updated Successfully'
        }
      }
    };

    mockAxios.patch.mockResolvedValue({
      data: mockData.data
    });

    const expectedActions = [
      {
        type: 'UPDATE_COMMENT',
        payload: {
          isEdited: true,
          payload: {
            comment,
            message: 'Comment Updated Successfully'
          }
        }
      }
    ];

    await store.dispatch(updateCommentRequest(slug, commentId, comment, token));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('Follow Reducer Tests', () => {
  const initialState = {};
  it('Should return a new state if it recieves a FOLLOW_AUTHOR action type', () => {
    const newState = editCommentReducer(initialState, {
      type: UPDATE_COMMENT,
      payload: {
        comment,
        message: 'Comment Updated Successfully'
      }
    });
    expect(newState).toEqual({
      updatedComment: {
        comment: 'Some new comment',
        message: 'Comment Updated Successfully'
      }
    });
  });
});

describe('EditCommentForm template', () => {
  const defaultProps = {
    updateCommentRequest: jest.fn(),
    commentId: 4,
    slug,
    token,
    handleClose: jest.fn()
  };

  it(`should simulate a user's comment update`, () => {
    const component = shallow(<EditCommentForm {...defaultProps} />);
    const event = {
      preventDefault() {}
    };
    component.find('form').simulate('submit', event);
  });
});
