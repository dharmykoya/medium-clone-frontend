import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import ProfileNavbar from '../../components/ProfileNavbar/index.jsx';
import ArticleTabList from '../../components/ArticleTabList/index.jsx';
import './DraftArticle.scss';
import { getDraftArticles, publishArticle } from './DraftArticle.action';
import LoadingIcon from '../../components/LoadingIndicator/index.jsx';
import PublishModal from '../../components/Modal/index.jsx';

export class DraftArticle extends Component {
  state = {
    show: false,
    singleArticleSlug: null
  };

  componentDidMount() {
    this.props.fetchUnPublishedArticles(this.props.auth.user.token);
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = slug => {
    this.setState({ show: true, singleArticleSlug: slug });
  };

  publishArticle = async () => {
    await this.props.publishArticle(
      this.state.singleArticleSlug,
      this.props.auth.user.token
    );
    this.props.fetchUnPublishedArticles(this.props.auth.user.token);
    this.handleClose();
  };

  render() {
    let ArticleList = <LoadingIcon />;
    const profileNav = {
      active: 'draft'
    };

    if (this.props.drafts !== null) {
      ArticleList = this.props.drafts.map(articleDetails => {
        const datePublished = moment(articleDetails.createdAt).format(
          'MMMM Do, YYYY'
        );
        const imageObj = JSON.parse(articleDetails.image);
        return (
          <ArticleTabList
            key={articleDetails.id}
            {...articleDetails}
            draft={true}
            lightTheme={this.props.lightTheme}
            datePublished={datePublished}
            actionButton="Publish"
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
          Are you sure you want to Publish this article?
          <div className="no-article-confirm-container text-center pt-3">
            <Link
              className="no-article-button button-normal button no-article-confirm-yes"
              to="#"
              onClick={this.publishArticle}
            >
              YES
            </Link>
            <Link
              className="no-article-button button-normal button no-article-confirm-no"
              to="#"
              onClick={this.handleClose}
            >
              NO
            </Link>
          </div>
        </PublishModal>

        <div className="col-md-12 publication-container">
          {this.props.drafts !== null && this.props.drafts.length === 0 ? (
            <h5 className="no-draft-text pt-5 text-center">
              You have no Drafted Articles
            </h5>
          ) : (
            ArticleList
          )}
        </div>
      </div>
    );
  }
}

DraftArticle.propTypes = {
  fetchUnPublishedArticles: PropTypes.func,
  publishArticle: PropTypes.func,
  lightTheme: PropTypes.bool,
  loading: PropTypes.bool,
  history: PropTypes.any,
  error: PropTypes.object,
  auth: PropTypes.object,
  drafts: PropTypes.array,
  token: PropTypes.string
};
export const mapStateToProps = state => ({
  lightTheme: state.theme.theme === 'light-theme',
  loading: state.signup.loading,
  userDetails: state.signup.authData === null,
  drafts: state.draftArticles.draftArticles,
  auth: state.auth
});

export const mapDispatchToProps = dispatch => ({
  fetchUnPublishedArticles: token => dispatch(getDraftArticles(token)),
  publishArticle: (slug, token) => dispatch(publishArticle(slug, token))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DraftArticle);
