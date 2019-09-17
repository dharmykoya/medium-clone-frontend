import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import mockAxios from 'axios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { logInRequest, logInUserError } from '../LoginPage/login.action';
import { LoginPage, mapDispatchToProps } from './index.jsx';
import { LOG_IN_USER, LOG_IN_USER_ERROR } from '../../actionTypes/index';
import loginReducer from '../LoginPage/login.reducer';
describe('Login component Tests', () => {
  const defaultProps = {
    logInRequest: jest.fn(),
    history: {},
    match: {},
    isLoading: false,
    theme: {
      theme: 'light-theme'
    }
  };
  it('renders the Login component correctly', () => {
    const wrapper = shallow(<LoginPage {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render component successfully and check form interactions', () => {
    const component = mount(
      <BrowserRouter>
        <LoginPage {...defaultProps} />
      </BrowserRouter>
    );
    component.find('form').simulate('submit');
  });
  it(`should ensure submit button text on sign in is rendered appropriately`, () => {
    const component = mount(
      <BrowserRouter>
        <LoginPage {...defaultProps} />
      </BrowserRouter>
    );
    expect(component.find('.login-button').text()).toBe('Sign In');
  });
  it('should simulate an onchange event on form input', () => {
    const event = {
      preventDefault() {},
      target: { name: 'email', value: 'fola@gmail.com' }
    };
    const component = mount(
      <BrowserRouter>
        <LoginPage {...defaultProps} debug />
      </BrowserRouter>
    );
    const inputTag = component.find('input').at(0);
    inputTag.simulate('change', event);
  });

  it('should simulate an onclick event for facebook login button', () => {
    const event = {
      preventDefault() {},
      target: window.location
    };
    const component = mount(
      <BrowserRouter>
        <LoginPage {...defaultProps} debug />
      </BrowserRouter>
    );

    const socialButton = component.find('.login-button-facebook');
    socialButton.simulate('click', event);
  });

  it('should simulate an onclick event for twitter login button', () => {
    const event = {
      preventDefault() {},
      target: window.location
    };
    const component = mount(
      <BrowserRouter>
        <LoginPage {...defaultProps} debug />
      </BrowserRouter>
    );

    const socialButton = component.find('.login-button-twitter');
    socialButton.simulate('click', event);
  });

  it('should simulate an onclick event for google login buttom', () => {
    const event = {
      preventDefault() {},
      target: window.location
    };
    const component = mount(
      <BrowserRouter>
        <LoginPage {...defaultProps} debug />
      </BrowserRouter>
    );

    const socialButton = component.find('.login-button-google');
    socialButton.simulate('click', event);
  });

  it('should call Login request function on submit of the form', () => {
    const wrapper = shallow(<LoginPage {...defaultProps} />);
    wrapper.debug();
    wrapper.find('form').simulate('submit', { preventDefault() {} });
    expect(defaultProps.logInRequest).toBeCalled();
    expect(defaultProps.logInRequest).toHaveReturned();
  });
  it('should dispatch login request action', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).logInRequest();
  });
});
describe('Login Async action Tests', () => {
  const userCredentials = {
    email: 'someuser@gmail.com',
    password: 'randompassword'
  };
  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);
  let store;
  beforeEach(() => {
    store = mockStore({});
    jest.resetAllMocks();
  });
  afterEach(() => {
    store.clearActions();
  });
  it('Should Trigger the LOG_IN_USER dispatch function', async () => {
    const mockData = {
      data: {
        firstName: 'some',
        lastName: 'user',
        email: 'someuser@gmail.com',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsI…c4OX0.DfJClt28K3qIgJJWp9FMypDO0tKD1NoiNtO9YvEOvsQ'
      }
    };
    mockAxios.post.mockResolvedValue({
      status: 200,
      data: mockData
    });
    const expectedActions = [{ type: LOG_IN_USER, payload: mockData.data }];
    const historyObject = {
      push: jest.fn()
    };
    store.dispatch(logInRequest(userCredentials, historyObject)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('Should Trigger the LOG_IN_USER_ERROR dispatch function', async () => {
    const mockData = {
      data: {
        data: {
          message: 'invalid email/password'
        }
      }
    };
    mockAxios.post.mockResolvedValue({
      response: mockData
    });
    const expectedActions = [
      { type: LOG_IN_USER_ERROR, payload: mockData.data.data.message }
    ];
    const { message } = mockData.data.data;
    await store.dispatch(logInUserError(message));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
describe('Log In Reducer Tests', () => {
  it('Should return default state', () => {
    const newState = loginReducer(undefined, {});
    expect(newState).toEqual({});
  });
  it('Should return a new state if it recieves a log in action type', () => {
    const user = {
      firstName: 'fola',
      lastName: 'abass',
      email: 'abass@gmail.com',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsI…c4OX0.DfJClt28K3qIgJJWp9FMypDO0tKD1NoiNtO9YvEOvsQ'
    };
    const newState = loginReducer(undefined, {
      type: LOG_IN_USER,
      payload: user
    });
    expect(newState).toEqual({ user });
  });
  it('Should return a new state if it recieves a log in error action type', () => {
    const error = {
      message: 'invalid email/password'
    };
    const newState = loginReducer(undefined, {
      type: LOG_IN_USER_ERROR,
      payload: error
    });
    expect(newState).toEqual({ error });
  });
});
