import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileNavbar from '../../components/ProfileNavbar/index.jsx';
import ArticleTabList from '../../components/BookmarkTabList/index.jsx';
import PublishModal from '../../components/Modal/index.jsx';
import './bookmark.scss';
import { getbookmarkedArticles, removeBookmark } from './bookmark.action';
import LoadingIcon from '../../components/LoadingIndicator/index.jsx';

export class BookmarkedArticle extends Component {
  state = {
    show: false,
    singleArticleSlug: null
  };

  componentWillMount() {
    this.props.fetchBookmarkedArticles(this.props.auth.user.token);
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = slug => {
    this.setState({ show: true, singleArticleSlug: slug });
  };

  removeArticleBookmark = async () => {
    await this.props.removeBookmarkOnArticle(
      this.state.singleArticleSlug,
      this.props.auth.user.token
    );
    this.props.fetchBookmarkedArticles(this.props.auth.user.token);
    this.handleClose();
  };

  render() {
    let ArticleList = <LoadingIcon />;
    const profileNav = {
      active: 'bookmark'
    };

    if (this.props.bookmarks !== null) {
      ArticleList = this.props.bookmarks.map(articleDetails => {
        const datePublished = moment(articleDetails.publishedAt).format(
          'MMMM Do, YYYY'
        );
        const imageObj = JSON.parse(articleDetails.image);
        return (
          <ArticleTabList
            key={articleDetails.id}
            {...articleDetails}
            datePublished={datePublished}
            actionButton="Remove bookmark"
            lightTheme={this.props.lightTheme}
            handleClose={this.handleClose}
            handleShow={this.handleShow}
            imageObj={imageObj}
          />
        );
      });
    }
    const userDetails = this.props.auth.user;

    return (
      <div className="container profile-page-publication-container">
        <div className="col-md-12">
          <ProfileNavbar
            {...userDetails}
            {...profileNav}
            lightTheme={this.props.lightTheme}
          />
        </div>
        <PublishModal
          show={this.state.show}
          lightTheme={this.props.lightTheme}
          handleClose={this.handleClose}
          handleShow={this.handleShow}
        >
          Are you sure you want to remove bookmark?
          <div className="no-article-confirm-container text-center pt-3">
            <Link
              className="no-article-button button-normal button no-article-confirm-yes"
              to="#"
              onClick={this.removeArticleBookmark}
            >
              YES
            </Link>
            <Link
              className="no-article-button button-normal button button no-article-confirm-no"
              to="#"
              onClick={this.handleClose}
            >
              NO
            </Link>
          </div>
        </PublishModal>

        <div className="col-md-12 publication-container">
          {this.props.bookmarks === null ||
          this.props.bookmarks.length === 0 ? (
            <h5 className="no-draft-text pt-5 text-center">
              You have not bookmarked any articles
            </h5>
          ) : (
            ArticleList
          )}
        </div>
      </div>
    );
  }
}

BookmarkedArticle.propTypes = {
  fetchBookmarkedArticles: PropTypes.func,
  removeBookmarkOnArticle: PropTypes.func,
  lightTheme: PropTypes.bool,
  loading: PropTypes.bool,
  history: PropTypes.any,
  error: PropTypes.object,
  userDetails: PropTypes.object,
  bookmarks: PropTypes.array,
  token: PropTypes.string,
  auth: PropTypes.object
};
export const mapStateToProps = state => ({
  lightTheme: state.theme.theme === 'light-theme',
  loading: state.signup.loading,
  userDetails: state.user.user,
  bookmarks: state.bookmarks.bookmarkedArticles,
  auth: state.auth
});

export const mapDispatchToProps = dispatch => ({
  fetchBookmarkedArticles: token => dispatch(getbookmarkedArticles(token)),
  removeBookmarkOnArticle: (slug, token) =>
    dispatch(removeBookmark(slug, token))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookmarkedArticle);
