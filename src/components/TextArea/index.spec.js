import React from 'react';
import { shallow } from 'enzyme';
import TextArea from './index';

describe('Render component', () => {
  it('should render the default dark theme textarea', () => {
    const wrapper = shallow(<TextArea placeholder={'Test'} />);
    expect(wrapper.exists()).toEqual(true);
    expect(wrapper.hasClass('textarea')).toEqual(true);
    expect(wrapper.hasClass('form-textarea-dark-theme')).toEqual(true);
  });

  it('should correctly render a light theme textarea', () => {
    const wrapper = shallow(
      <TextArea placeholder={'Test'} lightTheme={true} />
    );
    expect(wrapper.exists()).toEqual(true);
    expect(wrapper.hasClass('textarea')).toEqual(true);
    expect(wrapper.hasClass('form-textarea-light-theme')).toEqual(true);
  });

  it('should correctly render a textarea field with a custom class of additional-class', () => {
    const customClass = 'additional-class';
    const wrapper = shallow(
      <TextArea placeholder={'Test'} customClassName={customClass} />
    );
    expect(wrapper.exists()).toEqual(true);
    expect(wrapper.hasClass('textarea')).toEqual(true);
    expect(wrapper.hasClass(customClass)).toEqual(true);
  });
});
