import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../Button/index.jsx';
import PropTypes from 'prop-types';
import TextArea from '../TextArea/index.jsx';
import './CreateComment.scss';
import { createCommentOnArticle } from './createComment.action';
import {
  getCommentOnArticles,
  likeComment
} from '../../components/SingleComment/singleComment.action';
import SingleComment from '../../components/SingleComment/index.jsx';
import moment from 'moment';

export class CreateComment extends Component {
  state = {
    comment: null,
    count: null
  };

  ref = React.createRef();

  componentWillMount() {
    const { slug } = this.props.params;
    this.props.fetchArticleComment(slug);
  }

  handleChange = e => {
    e.preventDefault();
    const updatedComment = e.target.value;

    this.setState({ comment: updatedComment });
  };

  submitComment = async e => {
    e.preventDefault();
    const createdComment = { body: this.state.comment };
    await this.props.postComment(
      this.props.article.slug,
      createdComment,
      this.props.auth.user.token
    );
    this.ref.current.value = '';
    await this.props.fetchArticleComment(this.props.article.slug);
  };

  handleLike = async (e, id) => {
    e.preventDefault();
    await this.props.likeUnlikeComment(
      this.props.article.slug,
      id,
      this.props.auth.user.token
    );
    await this.props.fetchArticleComment(this.props.article.slug);
  };

  render() {
    let comment;
    if (this.props.allComment) {
      const reversedComments = this.props.allComment.comments;
      comment = reversedComments.map((comment, index) => {
        const datePublished = moment(comment.createdAt).format(
          'MMMM Do, YYYY, h:mm:ss a'
        );
        return (
          <SingleComment
            key={index + 1}
            theme={this.props.lightTheme ? 'light-theme' : 'dark-theme'}
            {...comment}
            datePublished={datePublished}
            handleLike={this.handleLike}
            handleCommentModalOpen={this.props.handleCommentModalOpen}
            handleCommentModalClose={this.props.handleCommentModalClose}
            token={this.props.auth.user.token}
            viewerEmail={this.props.auth.user.email}
          />
        );
      });
    }

    return (
      <div className="create-comment">
        {this.props.auth.user.token ? (
          <form name="comment-form" onSubmit={this.submitComment}>
            <div>
              <TextArea
                placeholder="Write your comment here"
                handleChange={e => this.handleChange(e)}
                required
                lightTheme={this.props.lightTheme}
                id="comment"
                name="comment"
                ref={this.ref}
              />
            </div>
            <div className="text-center">
              <Button customClassName="create-comment-button">comment</Button>
            </div>
          </form>
        ) : (
          <h4>
            Please <Link to="/login">Login</Link> to contribute.
          </h4>
        )}
        <div className="col-sm-12 col-md-12 article-comment-container">
          {comment}
        </div>
      </div>
    );
  }
}

CreateComment.propTypes = {
  lightTheme: PropTypes.bool,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  postComment: PropTypes.func,
  likeUnlikeComment: PropTypes.func,
  fetchArticleComment: PropTypes.func,
  article: PropTypes.object,
  params: PropTypes.object,
  token: PropTypes.string,
  slugtoken: PropTypes.string,
  allComment: PropTypes.object,
  auth: PropTypes.object,
  handleCommentModalOpen: PropTypes.func,
  handleCommentModalClose: PropTypes.func
};

export const mapStateToProps = state => {
  return {
    lightTheme: state.theme.theme === 'light-theme',
    article: state.readArticle.article,
    loading: state.articleComment.loading,
    allComment: state.commentOnArticle.allComment,
    auth: state.auth
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    postComment: (slug, comment, token) =>
      dispatch(createCommentOnArticle(slug, comment, token)),
    fetchArticleComment: slug => dispatch(getCommentOnArticles(slug)),
    likeUnlikeComment: (slug, commentId, token) =>
      dispatch(likeComment(slug, commentId, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateComment);
