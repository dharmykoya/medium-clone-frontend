import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileNavbar from '../../components/ProfileNavbar/index.jsx';
import ArticleTabList from '../../components/ArticleTabList/index.jsx';
import NoArticles from '../../components/NoArticleImage/index.jsx';
import PublishModal from '../../components/Modal/index.jsx';

import './PublishedArticle.scss';
import {
  getPublishedArticles,
  unpublishArticle
} from './publishedArticle.action';
import LoadingIcon from '../../components/LoadingIndicator/index.jsx';

export class PublishedArticle extends Component {
  state = {
    show: false,
    singleArticleSlug: null
  };

  componentWillMount() {
    this.props.fetchPublishedArticles(this.props.auth.user.token);
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = slug => {
    this.setState({ show: true, singleArticleSlug: slug });
  };

  unpublishArticle = async () => {
    await this.props.unpublishArticle(
      this.state.singleArticleSlug,
      this.props.auth.user.token
    );
    this.props.fetchPublishedArticles(this.props.auth.user.token);
    this.handleClose();
  };

  render() {
    let ArticleList = <LoadingIcon />;
    const profileNav = {
      active: 'published'
    };

    if (this.props.publications !== null) {
      ArticleList = this.props.publications.map(articleDetails => {
        const datePublished = moment(articleDetails.publishedAt).format(
          'MMMM Do, YYYY'
        );
        const imageObj = JSON.parse(articleDetails.image);
        return (
          <ArticleTabList
            key={articleDetails.id}
            {...articleDetails}
            datePublished={datePublished}
            actionButton="Unpublish"
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
          Are you sure you want to Unpublish this article?
          <div className="no-article-confirm-container text-center pt-3">
            <Link
              className="no-article-button button-normal button no-article-confirm-yes"
              to="#"
              onClick={this.unpublishArticle}
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
          {this.props.publications !== null &&
          this.props.publications.length === 0 ? (
            <NoArticles />
          ) : (
            ArticleList
          )}
        </div>
      </div>
    );
  }
}

PublishedArticle.propTypes = {
  fetchPublishedArticles: PropTypes.func,
  unpublishArticle: PropTypes.func,
  lightTheme: PropTypes.bool,
  loading: PropTypes.bool,
  history: PropTypes.any,
  error: PropTypes.object,
  userDetails: PropTypes.object,
  publications: PropTypes.array,
  token: PropTypes.string,
  auth: PropTypes.object
};
export const mapStateToProps = state => ({
  lightTheme: state.theme.theme === 'light-theme',
  loading: state.signup.loading,
  userDetails: state.user.user,
  publications: state.publications.publishedArticles,
  auth: state.auth
});

export const mapDispatchToProps = dispatch => ({
  fetchPublishedArticles: token => dispatch(getPublishedArticles(token)),
  unpublishArticle: (slug, token) => dispatch(unpublishArticle(slug, token))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PublishedArticle);
