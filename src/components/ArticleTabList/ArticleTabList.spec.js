import React from 'react';
import { shallow } from 'enzyme';
import ArticleTabList from './index.jsx';

describe('Render light component TablistContainer', () => {
  it('should render light theme container', () => {
    const lightArticleCard = {
      lightTheme: false,
      articleTitle: 'Writing React test Like a pro',
      articleDescription: 'writing e2e test for your app',
      publishedAt: 'July 2',
      readTime: '10 mins',
      numberLikes: 220,
      numberComment: 170,
      imageObj: { 0: 'some-image' }
    };
    shallow(<ArticleTabList {...lightArticleCard} />);
  });

  it('should render dark theme container', () => {
    const darkArticleCard = {
      lightTheme: true,
      articleTitle: 'Understanding redux and react',
      articleDescription: 'Redux the best storage system',
      publishedAt: 'July 28',
      readTime: '6 mins',
      numberLikes: 120,
      numberComment: 70,
      imageObj: { 0: '' }
    };
    shallow(<ArticleTabList {...darkArticleCard} />);
  });
});
