import React from 'react';
import { shallow } from 'enzyme';
import TablistContainer from './index.jsx';

describe('Render light component TablistContainer', () => {
  it('should render light theme container', () => {
    const props = {
      lightTheme: true
    };
    shallow(
      <TablistContainer {...props}>Testing the container</TablistContainer>
    );
  });

  it('should render dark theme container', () => {
    const props = {
      lightTheme: false
    };
    shallow(
      <TablistContainer {...props}>Testing the container</TablistContainer>
    );
  });
});
