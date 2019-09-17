import React from 'react';
import { shallow } from 'enzyme';
import Input from './index';

describe('Render component', () => {
  it('should the default button with text render correctly', () => {
    const wrapper = shallow(<Input name="test" placeholder={'Test'} />);
    expect(wrapper.exists()).toEqual(true);
    expect(wrapper.hasClass('input')).toEqual(true);
    expect(wrapper.hasClass('form-input-dark-theme')).toEqual(true);
  });

  it('should correctly render an inverse button type', () => {
    const wrapper = shallow(
      <Input name="test" placeholder={'Test Button'} lightTheme={true} />
    );
    expect(wrapper.exists()).toEqual(true);
    expect(wrapper.hasClass('input')).toEqual(true);
    expect(wrapper.hasClass('form-input-light-theme')).toEqual(true);
  });

  it('should correctly render a button with an additional class of additional-class ', () => {
    const customClass = 'additional-class';
    const wrapper = shallow(
      <Input name="test" placeholder={'Test'} customClassName={customClass} />
    );
    expect(wrapper.exists()).toEqual(true);
    expect(wrapper.hasClass('input')).toEqual(true);
    expect(wrapper.hasClass(customClass)).toEqual(true);
  });
});
