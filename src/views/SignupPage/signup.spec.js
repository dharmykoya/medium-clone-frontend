jest.unmock('axios');
import React from 'react';
import '@babel/polyfill';
import moxios from 'moxios';
import { mount, configure } from 'enzyme';
import signupReducer from './signup.reducer';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { BrowserRouter, history } from 'react-router-dom';
import thunk from 'redux-thunk';
import { userSignupStart, authSignup } from './signup.action';
import { SignupPage, mapDispatchToProps, mapStateToProps } from './index.jsx';
import {
  USER_SIGNUP_START,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL
} from '../../actionTypes/index';

configure({ adapter: new Adapter() });

const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);

let store = mockStore({});

const response = {
  status: 'success',
  data: {
    firstName: 'Isaac',
    lastName: 'Olayisade',
    email: 'issacolaaf7@gmail.com',
    image:
      'https://res.cloudinary.com/fxola/image/upload/v1562006344/avatar.png',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
  }
};

const errorResponse = {
  status: 'fail',
  data: {
    message: 'User exist already'
  }
};

describe('Signup', () => {
  describe('Signup Actions', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('dispatches userSignupStart action', () => {
      const expectedActions = [{ type: 'USER_SIGNUP_START' }];

      store.dispatch(userSignupStart());

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('dispatches success action if sign up was successful', done => {
      moxios.stubRequest(
        'https://persephone-backend-staging.herokuapp.com/api/v1/users/signup',
        {
          status: 201,
          response: response
        }
      );
      const userDetails = {
        email: 'iss@gmail.com',
        firstName: 'Isaac',
        lastName: 'Olayisade',
        password: 'Author40'
      };

      const expectedActions = [
        { type: 'USER_SIGNUP_START' },
        {
          type: 'USER_SIGNUP_SUCCESS',
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
          authData: {
            ...response.data
          }
        }
      ];
      store = mockStore({});

      store.dispatch(authSignup(userDetails, history)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
      done();
    });

    it('dispatches failure action if sign up failed', done => {
      moxios.stubRequest(
        'https://persephone-backend-staging.herokuapp.com/api/v1/users/signup',
        {
          status: 409,
          response: errorResponse
        }
      );

      const expectedActions = [
        { type: 'USER_SIGNUP_START' },
        { type: 'USER_SIGNUP_FAIL', authError: 'User exist already' }
      ];
      const userDetails = {
        email: 'iss@gmail.com',
        firstName: 'Isaac',
        lastName: 'Olayisade',
        password: 'Author40'
      };

      const pushSpy = { history: { push: jest.fn('/article') } };

      store = mockStore({});
      store.dispatch(authSignup(userDetails, pushSpy)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
      done();
    });
  });

  describe('Signup Page', () => {
    const props = {
      lightTheme: false,
      onClick: jest.fn(),
      signup: jest.fn(),
      handleChange: jest.fn()
    };
    const signupPage = mount(
      <BrowserRouter>
        <SignupPage {...props} handleChange={jest.fn()} />
      </BrowserRouter>
    );
    beforeEach(() => {
      // creates the store with any initial state or middleware needed
      store = mockStore();
    });

    it('should render Signin and simulate a click o signup button', () => {
      signupPage
        .find('.signup-button')
        .simulate('submit', { preventDefault() {} });
      expect(props.signup.mock.calls.length).toBe(1);
    });

    it('should simulate an onclick event for google login button', () => {
      signupPage
        .find('.button-google')
        .simulate('click', { preventDefault() {} });
    });

    it('should simulate an onclick event for facebook login button', () => {
      signupPage
        .find('.button-facebook')
        .simulate('click', { preventDefault() {} });
    });

    it('should simulate an onclick event for twitter login button', () => {
      signupPage
        .find('.button-twitter')
        .simulate('click', { preventDefault() {} });
    });
    it('should show initial state', () => {
      const initialState = {
        signup: {
          token: null,
          error: null,
          userDetails: null,
          loading: false
        },
        theme: {
          theme: 'dark-theme'
        }
      };

      expect(mapStateToProps(initialState).token).toEqual(undefined);
    });
    it('should dispatch action', () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).signup();
      expect(typeof dispatch.mock.calls[0][0]).toEqual('function');
    });

    it('should be called with the userDetails in the state as arguments', () => {
      signupPage.find('.signup-firstName').simulate('change', {
        target: { name: 'firstName', value: 'Damilola' }
      });

      signupPage
        .find('.signup-lastName')
        .simulate('change', { target: { name: 'lastName', value: 'Adekoya' } });

      signupPage.find('.signup-email').simulate('change', {
        target: { name: 'email', value: 'blah@gmail.com' }
      }); // fill in password field with cats
      signupPage.find('.signup-password').simulate('change', {
        target: { name: 'password', value: 'Author40' }
      }); // simulate form submission

      signupPage.find('form').simulate('submit', { preventDefault() {} }); // test to see arguments used after its been submitted
      expect(props.signup.mock.calls.length).toBe(1);
    });
  });

  describe('error on the signup input values', () => {
    const props = {
      lightTheme: false,
      onClick: jest.fn(),
      signup: jest.fn(),
      handleChange: jest.fn(),
      checkValidity: jest.fn()
    };
    const signupPage = mount(
      <BrowserRouter>
        <SignupPage {...props} handleChange={jest.fn()} />
      </BrowserRouter>
    );

    it('should trigger show error messages for all input fields ', () => {
      signupPage.find('.signup-firstName').simulate('change', {
        target: { name: 'firstName', value: '' }
      });
      const firstNameError = signupPage.find('.first-name-error p');
      expect(firstNameError.text()).toBe(
        'first name can not be empty and cannot contain a number'
      );

      signupPage
        .find('.signup-lastName')
        .simulate('change', { target: { name: 'lastName', value: '' } });
      const lastNameError = signupPage.find('.last-name-error p');
      expect(lastNameError.text()).toBe(
        'last name can not be empty and cannot contain a number'
      );

      signupPage.find('.signup-email').simulate('change', {
        target: { name: 'email', value: '' }
      });
      const emailError = signupPage.find('.email-error p');
      expect(emailError.text()).toBe('email must be a valid email');

      signupPage.find('.signup-password').simulate('change', {
        target: { name: 'password', value: '' }
      });
      const paswwordError = signupPage.find('.password-error p');
      expect(paswwordError.text()).toBe(
        'password must contain one capital letter, number and min of 8'
      );
    });
  });

  describe('(Signup Page', () => {
    it('should should show the user invalid input for all the input fields', () => {
      const props = {
        lightTheme: false,
        onClick: jest.fn(),
        signup: jest.fn(),
        handleChange: jest.fn(),
        error: {
          firstName: 'first name must be chars',
          lastName: 'last name must be chars',
          email: 'email must be valid',
          password:
            'password must contain a capital letter, number and must not be less than 8 chars'
        },
        state: {
          userData: {
            firstName: {
              elementtype: 'input',
              elementConfig: {
                type: 'text',
                placeholder: 'First Name',
                required: true
              },
              value: '',
              validation: {
                required: true,
                string: true
              },
              valid: false
            },
            lastName: {
              elementtype: 'input',
              elementConfig: {
                type: 'text',
                placeholder: 'Last Name',
                required: true
              },
              value: '',
              validation: {
                required: true,
                string: true
              },
              valid: false
            },
            email: {
              elementtype: 'input',
              elementConfig: {
                type: 'email',
                placeholder: 'Your Email',
                required: true
              },
              value: '',
              validation: {
                required: true,
                email: true
              },
              valid: false
            },
            password: {
              elementtype: 'input',
              elementConfig: {
                type: 'password',
                placeholder: 'Your Password',
                required: true
              },
              value: '',
              validation: {
                required: true,
                minLength: 8,
                password: true
              },
              valid: false
            }
          }
        }
      };
      const signupPage = mount(
        <BrowserRouter>
          <SignupPage {...props} />
        </BrowserRouter>
      );
      const firstNameError = signupPage.find('.first-name-error');
      const lastNameError = signupPage.find('.last-name-error');
      const emailError = signupPage.find('.email-error');
      const passwordError = signupPage.find('.password-error');
      expect(firstNameError).toBeTruthy();
      expect(lastNameError).toBeTruthy();
      expect(emailError).toBeTruthy();
      expect(passwordError).toBeTruthy();
    });
  });

  describe('show the loading icon on submit', () => {
    const props = {
      lightTheme: false,
      onClick: jest.fn(),
      signup: jest.fn(),
      handleChange: jest.fn(),
      checkValidity: jest.fn(),
      loading: true,
      error: {}
    };
    const signupPage = mount(
      <BrowserRouter>
        <SignupPage {...props} handleChange={jest.fn()} />
      </BrowserRouter>
    );

    it('should show the loading icon', () => {
      const loadingIcon = signupPage.find('.loader');
      expect(loadingIcon).toBeTruthy();
    });
  });

  describe('show the loading icon on submit', () => {
    const props = {
      lightTheme: true,
      onClick: jest.fn(),
      signup: jest.fn(),
      handleChange: jest.fn(),
      checkValidity: jest.fn(),
      loading: true,
      error: {}
    };
    const signupPage = mount(
      <BrowserRouter>
        <SignupPage {...props} handleChange={jest.fn()} />
      </BrowserRouter>
    );

    it('should show the loading icon', () => {
      const loadingIcon = signupPage.find('.hero-panel-signup h5');

      expect(loadingIcon).toBeTruthy();
    });
  });

  describe('test for reducers', () => {
    const initialState = {
      token: null,
      error: null,
      userDetails: null,
      loading: false
    };
    it('Should return default state', () => {
      const newState = signupReducer(undefined, {});
      expect(newState).toEqual(initialState);
    });

    it('Should return a new state if it recieves USER_SIGNUP_START in action type', () => {
      const state = {
        token: null,
        error: null,
        userDetails: null,
        loading: true
      };
      const newState = signupReducer(initialState, {
        type: USER_SIGNUP_START
      });
      expect(newState).toEqual(state);
    });

    it('Should return a new state if it recieves USER_SIGNUP_SUCCESS in action type', () => {
      const state = {
        token: 'some-token',
        error: null,
        userDetails: {
          toke: 'some-token',
          firstName: 'some-name',
          lastName: 'some-lastname'
        },
        loading: false
      };
      const newState = signupReducer(initialState, {
        type: USER_SIGNUP_SUCCESS,
        token: 'some-token',
        authData: state.userDetails
      });
      expect(newState).toEqual(state);
    });

    it('Should return a new state if it recieves USER_SIGNUP_FAIL in action type', () => {
      const state = {
        token: null,
        error: {
          firstName: 'first name must be a chars'
        },
        userDetails: null,
        loading: false
      };
      const newState = signupReducer(initialState, {
        type: USER_SIGNUP_FAIL,
        authError: state.error
      });
      expect(newState).toEqual(state);
    });
  });
});
