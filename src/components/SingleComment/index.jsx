/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import IconComponent from '../IconComponent/index.jsx';
import { getEditHistoryRequest } from '../EditCommentHistory/editCommentHistory.action';
import './singleComment.scss';

class SingleComment extends Component {
  state = {
    show: false
  };

  handleModalOpen = () => {
    this.setState({ show: true });
  };

  handleModalClose = () => {
    this.setState({ show: false });
  };

  render() {
    const commentLikesCount = this.props.commentLikes.length;

    const commentClass = `single-comment-container ${this.props.theme}`;
    const {
      id,
      userComment,
      body,
      slug,
      token,
      datePublished,
      handleLike,
      handleCommentModalOpen,
      getEditHistoryRequest,
      viewerEmail
    } = this.props;
    const name = `${userComment.firstName} ${userComment.lastName}`;
    const commentBody = body[Object.keys(body)[Object.keys(body).length - 1]];
    return (
      <div className={commentClass}>
        <div className="card text-left">
          <div className="card-body">
            <p className="card-text">{commentBody}</p>
            <div className="row article-comment-details">
              <div className="row article-comment-author-detail">
                <div>
                  <IconComponent
                    src={
                      userComment.image
                        ? userComment.image
                        : 'https://res.cloudinary.com/fxola/image/upload/v1562711912/ezkc4mj7pktwzqhmrbpt.png'
                    }
                    alt={'image asset'}
                    className="article-comment-author-image"
                  />
                </div>
                <div className="article-comment-author-info">
                  <h5>{name}</h5>
                  <span>{userComment.email}</span>
                </div>
              </div>
              <div className="article-comment-like">
                <Link
                  to="/"
                  onClick={e => handleLike(e, id)}
                  className="article-comment-like-click"
                >
                  <IconComponent
                    src="../../../src/assets/images/like.svg"
                    alt={'image asset'}
                    className={'icon-small svg-fill'}
                  />
                </Link>
                <span>{commentLikesCount}</span>
              </div>
            </div>
          </div>
          <div className="card-footer text-muted d-flex justify-content-between">
            {token ? (
              <span
                className={
                  'text-left d-block d-flex justify-content-between edit-functionality'
                }
              >
                {viewerEmail === userComment.email ? (
                  <span
                    onClick={() => handleCommentModalOpen('edit', id)}
                    className={'text-left d-inline-block'}
                    name="edit"
                  >
                    Edit
                  </span>
                ) : (
                  ''
                )}
                <span
                  onClick={() => {
                    handleCommentModalOpen('edit-history');
                    getEditHistoryRequest(slug, id, token);
                  }}
                  className={'text-right d-inline-block edit-history'}
                  name="edit-history"
                >
                  View Edit History
                </span>
              </span>
            ) : (
              ''
            )}

            <span className={'text-right d-inline-block'}>{datePublished}</span>
          </div>
        </div>
      </div>
    );
  }
}

SingleComment.propTypes = {
  theme: PropTypes.string,
  userComment: PropTypes.object,
  body: PropTypes.object,
  slug: PropTypes.string,
  token: PropTypes.string,
  datePublished: PropTypes.string,
  handleLike: PropTypes.func,
  id: PropTypes.number,
  commentLikes: PropTypes.any,
  handleCommentModalOpen: PropTypes.func,
  getEditHistoryRequest: PropTypes.func,
  viewerEmail: PropTypes.string
};

export const mapDispatchToProps = dispatch => {
  return {
    getEditHistoryRequest: (slug, id, token) =>
      dispatch(getEditHistoryRequest(slug, id, token))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SingleComment);
