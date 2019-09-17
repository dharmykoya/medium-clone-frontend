import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import authReducer from './auth.reducer';
import { setCurrentUser, logout } from './auth.action';
import { SET_CURRENT_USER } from '../../actionTypes';

configure({ adapter: new Adapter() });
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Auth Reducer', () => {
  const initialState = {
    isAuthenticated: false,
    user: {}
  };

  it('Should return a new state if it receives SET_CURRENT_USER in action type', () => {
    const state = {
      isAuthenticated: false,
      user: undefined
    };
    const newState = authReducer(initialState, {
      type: SET_CURRENT_USER
    });
    expect(newState).toEqual(state);
  });
});

describe('Auth Action', () => {
  const store = mockStore({});
  it('should set current user action', done => {
    const expectedActions = [{ type: SET_CURRENT_USER }];

    store.dispatch(setCurrentUser());
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it('should set current user action', done => {
    const expectedActions = [
      { type: 'SET_CURRENT_USER', payload: undefined },
      { type: 'SET_CURRENT_USER', payload: {} }
    ];

    store.dispatch(logout({ push: jest.fn() }));
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });
});
