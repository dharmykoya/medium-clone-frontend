import React from 'react';
import { shallow } from 'enzyme';
import Button from './index';

describe('Render component', () => {
  it('should the default button with text render correctly', () => {
    const wrapper = shallow(<Button buttonText={'Test Button'} />);
    expect(wrapper.exists()).toEqual(true);
    expect(wrapper.hasClass('button')).toEqual(true);
    expect(wrapper.hasClass('button-normal')).toEqual(true);
  });

  it('should correctly render an inverse button type', () => {
    const wrapper = shallow(
      <Button buttonText={'Test Button'} isInverse={true} />
    );
    expect(wrapper.exists()).toEqual(true);
    expect(wrapper.hasClass('button')).toEqual(true);
    expect(wrapper.hasClass('button-inverse')).toEqual(true);
  });

  it('should correctly render a button with an additional class of additional-class ', () => {
    const customClass = 'additional-class';
    const wrapper = shallow(
      <Button buttonText={'Test Button'} customClassName={customClass} />
    );
    expect(wrapper.exists()).toEqual(true);
    expect(wrapper.hasClass('button')).toEqual(true);
    expect(wrapper.hasClass(customClass)).toEqual(true);
  });
});
