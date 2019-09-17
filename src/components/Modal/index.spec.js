import React from 'react';
import { shallow } from 'enzyme';

import Modal from './index';

describe('Render component', () => {
  const props = {
    show: true,
    lightTheme: false
  };
  it('should render correctly in "debug" mode', () => {
    const wrapper = shallow(<Modal {...props} />);
    expect(wrapper.exists()).toEqual(true);
  });
  const prop = {
    show: false,
    lightTheme: true
  };
  it('should render correctly in "debug" mode', () => {
    const wrapper = shallow(<Modal {...prop} />);
    expect(wrapper.exists()).toEqual(true);
  });
});
