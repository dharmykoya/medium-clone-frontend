import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Social from './index';

configure({ adapter: new Adapter() });
let wrapper;
const props = {
  history: {},
  userDetails: [{}],
  window: {
    location: ''
  },
  logInUser: jest.fn(),
  handleAuth: jest.fn()
};

beforeEach(() => {
  global.window = Object.create(window);
  const url =
    'mockurl?token=1iSM&userid=1&firstname=firstname&lastname=lastname&username=username&email=email';
  Object.defineProperty(window, 'location', {
    value: {
      search: url
    }
  });
});

describe('<Social />', () => {
  it('renders the social component', done => {
    wrapper = shallow(<Social.WrappedComponent />);
    expect(wrapper).toBeTruthy();
    done();
  });

  it('sshould call login function on successful social sign in', done => {
    wrapper = mount(<Social.WrappedComponent {...props} />);
    done();
    expect(props.logInUser).toHaveBeenCalled();
  });
});
