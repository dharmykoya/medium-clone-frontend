import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import './ArticleCard.scss';

// how to make use of the image tag
{
  /* <img src={'../../src/assets/images/react.png'} className="float-left avatarImage" alt="author" /> */
}

const articleCard = props => {
  const articleImage = Object.values(JSON.parse(props.image));
  const URL = `articles/${props.slug}`;
  return (
    <div className={`card articleCard ${props.theme}`}>
      <img
        className="card-img-top"
        src={
          articleImage[0]
            ? articleImage[0]
            : 'http://www.wi65.org/wp-content/themes/joyn/images/default-thumb.png'
        }
        alt="article"
      />
      <div className={`card-body ${props.theme}`}>
        <h5 className="card-title">
          <Link to={URL} className="stretched-link">
            {props.title}
          </Link>
        </h5>
        <div className="card-text flex">
          {props.author ? (
            <div className="avatar">
              <img
                src={props.author.image}
                className="float-left avatarImage"
                alt="author"
              />

              <span>
                <div>{`${props.author.firstName} ${props.author.lastName}`}</div>

                <div>
                  {' '}
                  <small>{props.author.email}</small>
                </div>
              </span>
            </div>
          ) : (
            undefined
          )}

          <div className="flex mins-read">
            <small>{props.readTime} </small>
            <small> </small>
          </div>
        </div>
      </div>
    </div>
  );
};

articleCard.propTypes = {
  articleImage: PropTypes.any,
  theme: PropTypes.any,
  articleTitle: PropTypes.any,
  authorImage: PropTypes.any,
  author: PropTypes.object,
  email: PropTypes.any,
  readTime: PropTypes.any,
  image: PropTypes.any,
  title: PropTypes.string,
  slug: PropTypes.string
};

export default withRouter(articleCard);
