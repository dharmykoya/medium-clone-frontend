import React from 'react';
import { shallow } from 'enzyme';
import Loader from './index';

describe('Render component', () => {
  it('should render correctly in "debug" mode', () => {
    const wrapper = shallow(<Loader />);
    expect(wrapper.exists()).toEqual(true);
    expect(wrapper.hasClass('loader')).toEqual(true);
  });
});
