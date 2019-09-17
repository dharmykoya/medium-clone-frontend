jest.unmock('axios');
import React from 'react';
import '@babel/polyfill';
import { configure, shallow } from 'enzyme';
import notificationReducer from './notification.reducer';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  getNotificationStart,
  getNotificationSuccess,
  getAllNotifications,
  updateNotification
} from './notification.action';
import { Notification } from './index.jsx';
import {
  GET_NOTIFICATION_START,
  GET_NOTIFICATION_SUCCESS
} from '../../actionTypes/index';

configure({ adapter: new Adapter() });

const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);

let store = mockStore({});

describe('Notification  Actions', () => {
  it('dispatches getNotificationSuccess action', done => {
    const expectedActions = [
      { type: 'GET_NOTIFICATION_SUCCESS', payload: undefined }
    ];

    store.dispatch(getNotificationSuccess());

    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it('dispatches getNotificationStart action', done => {
    const expectedActions = [
      { type: 'GET_NOTIFICATION_SUCCESS', payload: undefined },
      { type: 'GET_NOTIFICATION_START' }
    ];

    store.dispatch(getNotificationStart());

    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it('dispatches getNotificationSuccess action', () => {
    const expectedActions = [
      { type: 'GET_NOTIFICATION_START' },
      {
        type: 'GET_NOTIFICATION_SUCCESS',
        payload: {}
      }
    ];

    store = mockStore({});
    store.dispatch(getAllNotifications()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('dispatches updateNotification action', () => {
    const expectedActions = [
      { type: 'GET_NOTIFICATION_START' },
      {
        type: 'GET_NOTIFICATION_SUCCESS',
        payload: {}
      }
    ];

    store = mockStore({});
    store.dispatch(updateNotification()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('Notification Reducers', () => {
  const initialState = {
    loading: false,
    notifications: []
  };

  it('Should return default state', () => {
    const newState = notificationReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  it('Should return a new state if it receives GET_NOTIFICATION_START in action type', () => {
    const state = {
      loading: true,
      notifications: []
    };
    const newState = notificationReducer(initialState, {
      type: GET_NOTIFICATION_START
    });
    expect(newState).toEqual(state);
  });

  it('Should return a new state if it receives GET_NOTIFICATION_SUCCESS in action type', () => {
    const state = {
      loading: false,
      notifications: undefined
    };
    const newState = notificationReducer(initialState, {
      type: GET_NOTIFICATION_SUCCESS
    });
    expect(newState).toEqual(state);
  });
});

it('renders the Notificationcomponent correctly', () => {
  const defaultProps = {
    notification: [{}, {}],
    handleIsread: jest.fn()
  };
  const wrapper = shallow(<Notification {...defaultProps} />);
  expect(wrapper).toMatchSnapshot();
});
