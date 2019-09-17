import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import { CarouselContainer } from './index.jsx';

const articleDetails = {
  image: '{"0":"../../src/assets/images/profileImage.jpg"}',
  light: false,
  articleTitle: 'Understanding React and redux',
  authorImage: '../../src/assets/images/react.png',
  author: { author: 'Damilola Adekoya' },
  email: 'damilola.adekoya@andela.com',
  readTime: '6 mins'
};
const articles = [
  articleDetails,
  articleDetails,
  articleDetails,
  articleDetails,
  articleDetails,
  articleDetails,
  articleDetails,
  articleDetails,
  articleDetails,
  articleDetails,
  articleDetails
];

describe('Render component', () => {
  it('should render the carousel component', () => {
    const wrapper = shallow(
      <BrowserRouter>
        <CarouselContainer
          articles={articles}
          category="Technology"
          theme="light-theme"
        />
      </BrowserRouter>
    );
    expect(wrapper.exists()).toEqual(true);

    expect(wrapper.hasClass('carousel-container')).toEqual(false);
  });

  it('should confirm the carousel prev click', () => {
    const wrapper = mount(
      <BrowserRouter>
        <CarouselContainer
          articles={articles}
          category="Technology"
          theme="light-theme"
        />
      </BrowserRouter>
    );
    expect(wrapper.exists()).toEqual(true);
    expect(wrapper.find('.carousel-control-prev')).toBeTruthy();

    expect(
      wrapper.find('a.carousel-control-prev').simulate('click')
    ).toBeTruthy();

    expect(wrapper.find('.articleCard')).toHaveLength(articles.length);
  });

  it('should successfully simulate the carousel prev button click', () => {
    const wrapper = mount(
      <BrowserRouter>
        <CarouselContainer
          articles={articles}
          category="Technology"
          theme="light-theme"
        />
      </BrowserRouter>
    );
    expect(wrapper.exists()).toEqual(true);
    expect(wrapper.find('.carousel-control-prev')).toBeTruthy();

    wrapper.find('a.carousel-control-prev').simulate('click');

    expect(wrapper.find('.articleCard')).toHaveLength(articles.length);
  });

  it('should confirm the carousel next click', () => {
    const wrapper = mount(
      <BrowserRouter>
        <CarouselContainer
          articles={articles}
          category="Technology"
          theme="light-theme"
        />
      </BrowserRouter>
    );
    expect(wrapper.exists()).toEqual(true);
    expect(wrapper.find('.carousel-control-next')).toBeTruthy();

    expect(
      wrapper.find('a.carousel-control-next').simulate('click')
    ).toBeTruthy();

    expect(wrapper.find('.articleCard')).toHaveLength(articles.length);
  });

  it('should successfully simulate the carousel next button click', () => {
    const wrapper = mount(
      <BrowserRouter>
        <CarouselContainer
          articles={articles}
          category="Technology"
          theme="light-theme"
        />
      </BrowserRouter>
    );

    global.window = Object.create(window);
    Object.defineProperty(window, 'screen', {
      value: {
        width: 1500
      }
    });

    global.dispatchEvent(new Event('resize'));
    expect(wrapper.exists()).toEqual(true);
    expect(wrapper.find('.carousel-control-next')).toBeTruthy();

    wrapper.find('a.carousel-control-next').simulate('click');

    expect(wrapper.find('.articleCard')).toHaveLength(articles.length);
  });
});
