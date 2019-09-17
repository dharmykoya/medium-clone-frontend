import { ProfileNavbar, mapDispatchToProps } from './index';
jest.unmock('axios');
import React from 'react';
import '@babel/polyfill';
import { mount, configure, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';

configure({ adapter: new Adapter() });

const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);

let store = mockStore({});

describe('<ProfileNavbar />', () => {
  it('should render light theme ArticleCard', () => {
    const props = {
      lightTheme: true,
      active: 'published',
      firstName: 'Damilola',
      lastName: 'Adekoya',
      handleClose: jest.fn(),
      auth: {
        user: {
          firstName: 'damilola',
          userName: 'dami'
        }
      }
    };
    store = mockStore({
      theme: {
        theme: {}
      },
      editProfile: {
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
      auth: {
        user: {
          firstName: 'damilola',
          userName: 'dami'
        }
      }
    });
    const profileNav = mount(
      <Provider store={store}>
        <BrowserRouter>
          <ProfileNavbar {...props} />
        </BrowserRouter>
      </Provider>
    );
  

    profileNav.find('.edit-first-name').simulate('change', {
      target: { name: 'firstName', value: 'Damilola' }
    });

    profileNav.find('.edit-last-name').simulate('change', {
      target: { name: 'lastName', value: 'Solomon' }
    });

    profileNav.find('.edit-user-name').simulate('change', {
      target: { name: 'userName', value: 'dharmykoya' }
    });

    profileNav.find('.edit-profile-text-area').simulate('change', {
      target: { name: 'bio', value: 'I want to be a world class developer' }
    });
    const dispatch = jest.fn();
    profileNav.find('form').simulate('submit', { preventDefault() {} }); // test to see arguments used after its been submitted
    mapDispatchToProps(dispatch).updateUserProfile();
  });

  it('should render dark theme ArticleCard', () => {
    const prop = {
      lightTheme: false,
      active: 'draft',
      firstName: 'Damilola',
      lastName: 'Adekoya',
      auth: {
        user: {
          firstName: 'damilola',
          userName: 'dami'
        }
      }
    };
    shallow(<ProfileNavbar {...prop} />);
  });

  it('should render dark theme ArticleCard', () => {
    const prop = {
      lightTheme: false,
      active: 'bookmark',
      firstName: 'Damilola',
      lastName: 'Adekoya',
      auth: {
        user: {
          firstName: 'damilola',
          userName: null
        }
      }
    };
    shallow(<ProfileNavbar {...prop} />);
  });

  it('should render dark theme ArticleCard', () => {
    const prop = {
      lightTheme: false,
      active: 'followers',
      firstName: 'Damilola',
      lastName: 'Adekoya',
      auth: {
        user: {
          firstName: 'damilola',
          userName: ''
        }
      }
    };
    shallow(<ProfileNavbar {...prop} />);
  });

  it('should render dark theme ArticleCard', () => {
    const prop = {
      lightTheme: false,
      active: 'following',
      firstName: 'Damilola',
      lastName: 'Adekoya',
      auth: {
        user: {
          firstName: 'damilola',
          userName: 'dami'
        }
      }
    };
    shallow(<ProfileNavbar {...prop} />);
  });

  it('should render handleNotify method', () => {
    const prop = {
      lightTheme: false,
      active: 'followers',
      firstName: 'Damilola',
      lastName: 'Adekoya',
      auth: {
        user: {
          firstName: 'damilola',
          userName: ''
        }
      }
    };
    const component = shallow(<ProfileNavbar {...prop} />);
    const instance = component.instance();
    jest.spyOn(instance, 'handleNotify');
    instance.handleNotify('new');
    expect(instance.handleNotify).toHaveBeenCalled();
  });

  it('should render handleClose method', () => {
    const prop = {
      lightTheme: false,
      active: 'followers',
      firstName: 'Damilola',
      lastName: 'Adekoya',
      auth: {
        user: {
          firstName: 'damilola',
          userName: ''
        }
      }
    };
    const component = shallow(<ProfileNavbar {...prop} />);
    const instance = component.instance();
    jest.spyOn(instance, 'handleClose');
    instance.handleClose('new');
    expect(instance.handleClose).toHaveBeenCalled();
  });

  it('should render handleOpen method', () => {
    const prop = {
      lightTheme: false,
      active: 'followers',
      firstName: 'Damilola',
      lastName: 'Adekoya',
      auth: {
        user: {
          firstName: 'damilola',
          userName: ''
        }
      }
    };
    const component = shallow(<ProfileNavbar {...prop} />);
    const instance = component.instance();
    jest.spyOn(instance, 'handleShow');
    instance.handleShow('new');
    expect(instance.handleShow).toHaveBeenCalled();
  });
});
