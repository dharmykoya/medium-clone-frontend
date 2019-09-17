jest.unmock('axios');
import React from 'react';
import '@babel/polyfill';
import moxios from 'moxios';
import { mount, configure } from 'enzyme';
import { Provider } from 'react-redux';
import editProfileReducer from './editProfile.reducer';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import {
  editProfileStart,
  editProfileSuccess,
  editProfileFail,
  updateProfile
} from './editProfile.action';
import EditProfile from './index.jsx';
import {
  EDIT_PROFILE_START,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL
} from '../../actionTypes/index';

configure({ adapter: new Adapter() });

const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);

let store = mockStore({});

const editProfileResponse = {
  status: 'success',
  data: {
    firstName: 'Funmilayo',
    lastName: 'Adekoya',
    bio: 'dhdkala',
    userName: 'djjkslka',
    twitterHandle: null,
    facebookHandle: null,
    image:
      'https://res.cloudinary.com/fxola/image/upload/v1566997038/avatar/mypic.jpeg.jpg'
  }
};

const failResponse = {
  status: 'fail',
  data: 'lastName cannot be empty'
};

describe('Edit Profile', () => {
  describe('Edit profile Actions', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('dispatches editProfileStart action', done => {
      const expectedActions = [{ type: 'EDIT_PROFILE_START' }];

      store.dispatch(editProfileStart());

      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it('dispatches editProfileSuccess action', done => {
      const expectedActions = [
        { type: 'EDIT_PROFILE_START' },
        {
          type: 'EDIT_PROFILE_SUCCESS',
          userData: {
            firstName: 'Funmilayo',
            lastName: 'Adekoya',
            bio: 'dhdkala',
            userName: 'djjkslka',
            twitterHandle: null,
            facebookHandle: null,
            image:
              'https://res.cloudinary.com/fxola/image/upload/v1566997038/avatar/mypic.jpeg.jpg'
          }
        }
      ];

      store.dispatch(editProfileSuccess(editProfileResponse.data));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it('dispatches editProfileFail action', done => {
      const expectedActions = [
        { type: 'EDIT_PROFILE_START' },
        {
          type: 'EDIT_PROFILE_SUCCESS',
          userData: {
            firstName: 'Funmilayo',
            lastName: 'Adekoya',
            bio: 'dhdkala',
            userName: 'djjkslka',
            twitterHandle: null,
            facebookHandle: null,
            image:
              'https://res.cloudinary.com/fxola/image/upload/v1566997038/avatar/mypic.jpeg.jpg'
          }
        },
        { type: 'EDIT_PROFILE_FAIL', error: 'lastName cannot be empty' }
      ];

      store.dispatch(editProfileFail(failResponse.data));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it('dispatches updateProfile action', done => {
      const userData = {
        firstName: 'damilola'
      };
      const token = 'some-token';
      const expectedActions = [
        { type: 'EDIT_PROFILE_START' },
        {
          type: 'EDIT_PROFILE_SUCCESS',
          userData: {
            firstName: 'Funmilayo',
            lastName: 'Adekoya',
            bio: 'dhdkala',
            userName: 'djjkslka',
            twitterHandle: null,
            facebookHandle: null,
            image:
              'https://res.cloudinary.com/fxola/image/upload/v1566997038/avatar/mypic.jpeg.jpg'
          }
        },
        { type: 'EDIT_PROFILE_FAIL', error: 'lastName cannot be empty' },
        { type: 'EDIT_PROFILE_START' }
      ];

      moxios.stubRequest(
        'https://persephone-backend-staging.herokuapp.com/api/v1/users',
        {
          status: 201,
          response: editProfileResponse.data
        }
      );

      store.dispatch(updateProfile(userData, token));
      expect(store.getActions()).toEqual(expectedActions);

      done();
    });

    it('dispatches updateProfile action to fail', done => {
      const userData = {
        firstName: 'damilola'
      };
      const token = 'some-token';
      const expectedActions = [
        { type: 'EDIT_PROFILE_START' },
        {
          type: 'EDIT_PROFILE_SUCCESS',
          userData: {
            firstName: 'Funmilayo',
            lastName: 'Adekoya',
            bio: 'dhdkala',
            userName: 'djjkslka',
            twitterHandle: null,
            facebookHandle: null,
            image:
              'https://res.cloudinary.com/fxola/image/upload/v1566997038/avatar/mypic.jpeg.jpg'
          }
        },
        { type: 'EDIT_PROFILE_FAIL', error: 'lastName cannot be empty' },
        { type: 'EDIT_PROFILE_START' },
        { type: 'EDIT_PROFILE_SUCCESS', userData: undefined },
        { type: 'EDIT_PROFILE_START' }
      ];

      const result = {
        data: {
          data: {
            message: 'something went wrong'
          }
        }
      };
      moxios.stubRequest(
        'http://persephone-backend-staging.herokuapp.com/api/v1/users',
        {
          status: 400,
          response: result.data
        }
      );

      store.dispatch(updateProfile(userData, token));
      expect(store.getActions()).toEqual(expectedActions);

      done();
    });
  });

  describe('Edit Profile reducers', () => {
    const initialState = {
      userData: null,
      loading: false,
      error: null
    };

    it('Should return default state', () => {
      const newState = editProfileReducer(undefined, {});
      expect(newState).toEqual(initialState);
    });

    it('Should return a new state if it recieves EDIT_PROFILE_START in action type', () => {
      const state = {
        userData: null,
        loading: true,
        error: null
      };
      const newState = editProfileReducer(initialState, {
        type: EDIT_PROFILE_START
      });
      expect(newState).toEqual(state);
    });

    it('Should return a new state if it recieves EDIT_PROFILE_SUCCESS in action type', () => {
      const state = {
        userData: editProfileResponse.data,
        loading: false,
        error: null
      };
      const newState = editProfileReducer(initialState, {
        type: EDIT_PROFILE_SUCCESS,
        userData: editProfileResponse.data
      });
      expect(newState).toEqual(state);
    });

    it('Should return a new state if it recieves EDIT_PROFILE_FAIL in action type', () => {
      const state = {
        userData: null,
        loading: false,
        error: failResponse.data
      };
      const newState = editProfileReducer(initialState, {
        type: EDIT_PROFILE_FAIL,
        error: failResponse.data
      });
      expect(newState).toEqual(state);
    });
  });

  describe('Edit Profile Page', () => {
    it('should render edit profile page on darktheme component', done => {
      const props = {
        lighTheme: false,
        handleChange: jest.fn(),
        onClick: jest.fn(),
        // ref: jest.fn(),
        ref: {
          current: {
            click: jest.fn()
          }
        },
        updateHandler: jest.fn()
      };
      const editProfile = mount(
        <Provider store={store}>
          <BrowserRouter>
            <EditProfile {...props} />
          </BrowserRouter>
        </Provider>
      );

      editProfile.find('.edit-profile-icon').simulate('click');

      editProfile.find('.edit-first-name').simulate('change', {
        target: { name: 'firstName', value: 'Damilola' }
      });

      editProfile.find('.edit-last-name').simulate('change', {
        target: { name: 'lastName', value: 'Solomon' }
      });

      editProfile.find('.edit-user-name').simulate('change', {
        target: { name: 'userName', value: 'dharmykoya' }
      });

      editProfile.find('.edit-profile-text-area').simulate('change', {
        target: { name: 'bio', value: 'I want to be a world class developer' }
      });

      editProfile.find('form').simulate('submit', { preventDefault() {} }); // test to see arguments used after its been submitted
      // expect(props.signup.mock.calls.length).toBe(1);
      done();
    });

    it('should render edit profile page on lightTheme component', done => {
      const props = {
        lighTheme: true,
        handleChange: jest.fn(),
        onClick: jest.fn(),
        ref: {
          current: {
            click: jest.fn()
          }
        },
        onChange: jest.fn(),
        updateHandler: jest.fn()
      };
      const editProfile = mount(
        <Provider store={store}>
          <BrowserRouter>
            <EditProfile {...props} />
          </BrowserRouter>
        </Provider>
      );
      editProfile.find('.edit-profile-icon').simulate('click');

      editProfile.find('.edit-first-name').simulate('change', {
        target: { name: 'firstName', value: 'Damilola' }
      });

      editProfile.find('.edit-last-name').simulate('change', {
        target: { name: 'lastName', value: 'Solomon' }
      });

      editProfile.find('.edit-user-name').simulate('change', {
        target: { name: 'userName', value: 'dharmykoya' }
      });

      editProfile.find('.edit-profile-text-area').simulate('change', {
        target: { name: 'bio', value: 'I want to be a world class developer' }
      });

      editProfile.find('form').simulate('submit', { preventDefault() {} }); // test to see arguments used after its been submitted

      done();
    });
  });
});
