import React from 'react';
import { shallow } from 'enzyme';
import Toggle from './index';

// arrange
const renderedComponent = args => {
  const defaultProps = {
    classToggle: '',
    handleClick: jest.fn()
  };
  const props = { ...defaultProps, ...args };
  return shallow(<Toggle {...props} />);
};

describe('Render component and passes', () => {
  it('should render component successfully', () => {
    renderedComponent();
  });

  it('should render component successfully if classToggle is passed', () => {
    const component = renderedComponent({ classToggle: 'switch' });
    expect(component.find('button').hasClass('switch toggle')).toBeTruthy();
  });

  it('should not render component successfully if invalid props are passed', () => {
    const component = renderedComponent({ classToggle: 'switcher' });
    expect(component.find('button').hasClass('switch toggle')).toBe(false);
  });
});
