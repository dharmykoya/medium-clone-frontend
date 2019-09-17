/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import IconComponent from '../IconComponent/index.jsx';
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  TwitterIcon,
  FacebookIcon,
  EmailIcon
} from 'react-share';

const AuthorCard = props => {
  const {
    image,
    fullname,
    handle,
    bio,
    isFollowing,
    lightTheme,
    articleUrl,
    handleCreateBookmark,
    articleLikesCount,
    handleArticleLike,
    isAuthenticated,
    handleFollow
  } = props;
  const shareText = "Checkout this awesome article on author's haven below:";

  const followText = isFollowing ? 'Following' : 'Follow';
  const followButtonClass = isFollowing
    ? 'follow-author button author-card-follow-button isFollowing'
    : 'follow-author button author-card-follow-button isNotFollowing';
  const themeClass = lightTheme ? 'author-card-light' : 'author-card-dark';

  return (
    <div className={themeClass}>
      <div className="container-fluid d-flex  pt-4 pb-3">
        <div>
          <IconComponent
            src={image}
            alt="avatar"
            className="rounded-circle author-image"
          />
        </div>
        <div className="row author-card-stat-container">
          <div className="row pl-3 author-card-user-details">
            <p className="small-text  author-name text-sm-left col-sm-12">
              {fullname}
            </p>
            <p className="small-text  text-sm-left col-sm-12">@{handle}</p>
          </div>
          <div className="container-fluid read-artile-like-stat">
            <span>
              {articleLikesCount}
              <span onClick={handleArticleLike} className="pl-1 like-button">
                Likes
              </span>
            </span>
            <span>
              <Link to="#" onClick={handleCreateBookmark}>
                {' '}
                Bookmark
              </Link>
            </span>
          </div>
          <div className="container-fluid read-article-social">
            <FacebookShareButton
              className="share-icon"
              quote={shareText}
              url={articleUrl}
            >
              <FacebookIcon size={24} />
            </FacebookShareButton>

            <TwitterShareButton
              className="share-icon"
              quote={shareText}
              url={articleUrl}
            >
              <TwitterIcon size={24} />
            </TwitterShareButton>

            <EmailShareButton
              className="share-icon"
              quote={shareText}
              url={articleUrl}
            >
              <EmailIcon size={24} />
            </EmailShareButton>
          </div>
        </div>
      </div>

      <hr />
      <p className="container-fluid author-bio small-text">
        {bio === 'null' || !bio ? '' : bio}
      </p>
      {isAuthenticated ? (
        <div
          onClick={handleFollow}
          className="author-card-follow-button-container"
        >
          <Link to="#" className={followButtonClass}>
            {followText}
          </Link>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

AuthorCard.propTypes = {
  image: PropTypes.string.isRequired,
  fullname: PropTypes.string.isRequired,
  handle: PropTypes.string,
  bio: PropTypes.string,
  isFollowing: PropTypes.bool.isRequired,
  lightTheme: PropTypes.bool.isRequired,
  articleUrl: PropTypes.string,
  slug: PropTypes.string,
  bookmark: PropTypes.bool,
  handleCreateBookmark: PropTypes.func,
  articleLikesCount: PropTypes.number,
  handleArticleLike: PropTypes.func,
  isAuthenticated: PropTypes.string,
  handleFollow: PropTypes.func
};

export default AuthorCard;
