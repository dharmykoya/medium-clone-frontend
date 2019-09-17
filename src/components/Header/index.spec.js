import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './index';
import * as actionTypes from '../../actionTypes';
import { themeToggler } from './index.action';

const defaultProps = {
  themeToggler: jest.fn(),
  theme: {
    theme: 'light-theme'
  },
  auth: {
    isAuthenticated: false,
    user: {
      image: '',
      firstName: ''
    }
  },
  getAllNotifications: jest.fn(),
  Notifications: {
    notifications: [{}]
  }
};

const actionArgs = {
  theme: 'light-theme'
};

describe('Render component', () => {
  it('should create an action ', () => {
    //arrange
    const expectedAction = {
      type: actionTypes.APP_THEME,
      payload: actionArgs
    };
    // act
    const action = themeToggler(actionArgs);
    //assert
    expect(action).toEqual(expectedAction);
  });

  it('should render component successfully', () => {
    const component = mount(
      <BrowserRouter>
        <Header {...defaultProps} />
      </BrowserRouter>
    );
    expect(
      component.contains(<h3 className="m-0">Author's Haven</h3>)
    ).toBeTruthy();
  });

  it('should toggle to light theme', () => {
    const component = mount(
      <BrowserRouter>
        <Header {...defaultProps} />
      </BrowserRouter>
    );
    component.find('.toggle').simulate('click');
    expect(component.find('.toggle').length).toEqual(1);
    expect(component).toMatchSnapshot();
  });

  it('should toggle to dark theme', () => {
    const component = mount(
      <BrowserRouter>
        <Header {...defaultProps} />
      </BrowserRouter>
    );
    component.find('.toggle').simulate('click');
    expect(component.find('.toggle .switch')).toBeTruthy();
    expect(component).toMatchSnapshot();
  });

  it('should toggle to dark theme', () => {
    const component = mount(
      <BrowserRouter>
        <Header
          {...{
            themeToggler: jest.fn(),
            theme: {
              theme: 'dark-theme'
            },
            auth: {
              isAuthenticated: false,
              user: {
                image: '',
                firstName: ''
              }
            },
            getAllNotifications: jest.fn(),
            Notifications: {
              notifications: [{}]
            }
          }}
        />
      </BrowserRouter>
    );
    component.find('.toggle').simulate('click');
    expect(component.find('.toggle .switch')).toBeTruthy();
    expect(component).toMatchSnapshot();
  });

  it('should check if user is authenticated', () => {
    const component = mount(
      <BrowserRouter>
        <Header
          {...{
            themeToggler: jest.fn(),
            theme: {
              theme: 'dark-theme'
            },
            auth: {
              isAuthenticated: true,
              user: {
                image: '',
                firstName: ''
              }
            },

            getAllNotifications: jest.fn(),
            Notifications: {
              notifications: [{}]
            }
          }}
        />
      </BrowserRouter>
    );
    component
      .find('.compose-btn')
      .at(0)
      .simulate('click');
    expect(component).toMatchSnapshot();
  });

  it('should logout user successfully', () => {
    const component = mount(
      <BrowserRouter>
        <Header
          {...{
            themeToggler: jest.fn(),
            logout: jest.fn(),
            theme: {
              theme: 'dark-theme'
            },
            auth: {
              isAuthenticated: true,
              user: {
                image: 'sam.jpg',
                firstName: ''
              }
            },

            getAllNotifications: jest.fn(),
            Notifications: {
              notifications: [{}]
            }
          }}
        />
      </BrowserRouter>
    );
    component
      .find('.logout')
      .at(0)
      .simulate('click');
    expect(component).toMatchSnapshot();
  });

  it('should toggle navbar correctly', () => {
    const component = mount(
      <BrowserRouter>
        <Header
          {...{
            themeToggler: jest.fn(),
            logout: jest.fn(),
            theme: {
              theme: 'dark-theme'
            },
            auth: {
              isAuthenticated: true,
              user: {
                image: 'sam.jpg',
                firstName: ''
              }
            },
            getAllNotifications: jest.fn(),
            Notifications: {
              notifications: [{}]
            }
          }}
        />
      </BrowserRouter>
    );
    component
      .find('button')
      .at(0)
      .simulate('click');
    expect(component).toMatchSnapshot();
  });
});
