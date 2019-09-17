import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logInUser } from '../../views/LoginPage/login.action';

class Social extends Component {
  handleAuth = async () => {
    const { history } = this.props;
    const userDetails = location.search.split('&');
    const token = userDetails[0].split('=')[1];
    const user = {
      id: userDetails[1].split('=')[1],
      firstName: userDetails[2].split('=')[1],
      lastName: userDetails[3].split('=')[1],
      userName: userDetails[4].split('=')[1],
      email: userDetails[5].split('=')[1],
      token
    };
    try {
      this.props.logInUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      history.push('/articles');
    } catch (error) {
      return error.message;
    }
  };

  componentDidMount() {
    this.handleAuth();
  }
  render() {
    return <div></div>;
  }
}

Social.propTypes = {
  history: PropTypes.object,
  logInUser: PropTypes.func
};

export default connect(
  null,
  { logInUser }
)(Social);
