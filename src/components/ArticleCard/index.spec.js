import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import ArticleCard from './index.jsx';

configure({ adapter: new Adapter() });

describe('<ArticleCard />', () => {
  it('should render light theme ArticleCard', () => {
    const articleDetails = {
      image: '{"0":"../../src/assets/images/profileImage.jpg"}',
      light: false,
      articleTitle: 'Understanding React and redux',
      authorImage: '../../src/assets/images/react.png',
      author: { author: 'Damilola Adekoya' },
      email: 'damilola.adekoya@andela.com',
      readTime: '6 mins',
      theme: false
    };
    shallow(
      <BrowserRouter>
        <ArticleCard {...articleDetails} />
      </BrowserRouter>
    );
  });

  it('should render dark theme ArticleCard', () => {
    const articleDetails = {
      image: '{"0":"../../src/assets/images/profileImage.jpg"}',
      light: false,
      articleTitle: 'Understanding React and redux',
      authorImage: '../../src/assets/images/react.png',
      author: null,
      email: 'damilola.adekoya@andela.com',
      readTime: '6 mins',
      theme: false
    };
    mount(
      <BrowserRouter>
        <ArticleCard {...articleDetails} />
      </BrowserRouter>
    );
  });
});
