import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfileNavbar from '../../components/ProfileNavbar/index.jsx';
import FollowersTablist from '../../components/FollowersTablist/index.jsx';
import { getUserFollowersRequest } from '../ReadArticlePage/readArticle.action';
import LoadingIcon from '../../components/LoadingIndicator/index.jsx';

export class DraftArticle extends Component {
  componentDidMount() {
    const {
      auth: {
        user: { token, id }
      }
    } = this.props;
    this.props.getUserFollowersRequest(id, token);
  }

  render() {
    let FollowersList = <LoadingIcon />;
    const profileNav = {
      active: 'followers'
    };
    const {
      user: { followers }
    } = this.props;

    if (this.props.user && followers) {
      FollowersList = Array.isArray(followers) ? (
        followers.map(user => {
          const { id, email, firstName, lastName, image } = user.follower;

          return (
            <FollowersTablist
              lightTheme={this.props.lightTheme}
              key={id}
              email={email}
              name={firstName + '  ' + lastName}
              image={image}
            />
          );
        })
      ) : (
        <h5 className="text-center pt-5">
          You currently don't have any follower
        </h5>
      );
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

        <div className="col-md-12 publication-container">{FollowersList}</div>
      </div>
    );
  }
}

DraftArticle.propTypes = {
  getUserFollowersRequest: PropTypes.func,
  lightTheme: PropTypes.bool,
  loading: PropTypes.bool,
  history: PropTypes.any,
  error: PropTypes.object,
  auth: PropTypes.object,
  token: PropTypes.string,
  user: PropTypes.object
};

export const mapStateToProps = state => ({
  lightTheme: state.theme.theme === 'light-theme',
  loading: state.signup.loading,
  userDetails: state.signup.authData === null,
  auth: state.auth,
  user: state.user
});

export const mapDispatchToProps = dispatch => ({
  getUserFollowersRequest: (id, token) =>
    dispatch(getUserFollowersRequest(id, token))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DraftArticle);
