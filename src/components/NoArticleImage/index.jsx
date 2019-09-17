import React from 'react';
import { Link } from 'react-router-dom';
import IconComponent from '../IconComponent/index.jsx';
import './NoArticle.scss';

const NoArticle = () => {
  return (
    <div className="no-article-container">
      <Link className="no-article-button button-normal button" to="/compose">
        Compose Article
      </Link>
      <h3>Oops! You have no articles published yet</h3>
      <IconComponent
        src={'./../src/assets/images/no-article.svg'}
        alt={'image asset'}
      />
    </div>
  );
};

export default NoArticle;
