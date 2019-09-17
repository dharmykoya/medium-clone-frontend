import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { Footer } from './index.jsx';

const prop = {
  theme: 'light-theme'
};

describe('Render component', () => {
  it('should render correctly in "debug" mode', () => {
    const component = mount(
      <BrowserRouter>
        <Footer theme={prop} />
      </BrowserRouter>
    );
    expect(component).toMatchSnapshot();
    expect(component.contains(<h5>Connect with Us</h5>)).toBeTruthy();
  });

  it('should have Icon rendered', () => {
    const component = mount(
      <BrowserRouter>
        <Footer theme={prop} />
      </BrowserRouter>
    );
    expect(
      component.contains(
        <img src="./../src/assets/images/google-plus.svg" alt="google plus" />
      )
    ).toBeTruthy();
  });

  it('should have Icon rendered', () => {
    const component = mount(
      <BrowserRouter>
        <Footer theme={{ theme: 'dark-theme' }} />
      </BrowserRouter>
    );
    expect(
      component.contains(
        <img
          src="./../src/assets/images/google-plus-light.svg"
          alt="google plus light"
        />
      )
    ).toBeTruthy();
    expect(
      component.contains(
        <img
          src="./../src/assets/images/facebook-light.svg"
          alt="facebook light"
        />
      )
    ).toBeTruthy();
  });

  it('should have Icon rendered', () => {
    const component = mount(
      <BrowserRouter>
        <Footer theme={{ theme: 'dark-theme' }} />
      </BrowserRouter>
    );

    expect(
      component.contains(
        <img
          src="./../src/assets/images/facebook-light.svg"
          alt="facebook light"
        />
      )
    ).toBeTruthy();
  });
});
