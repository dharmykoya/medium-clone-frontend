import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import axios from 'axios';
import { Link } from 'react-router-dom';
import IconComponent from '../../components/IconComponent/index.jsx';
import './VerifyUser.scss';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

export class VerifyUser extends Component {
  state = {
    successResponse: '',
    failureResponse: ''
  };

  componentDidMount() {
    const { token } = queryString.parse(this.props.location.search);
    // verify user via backend
    this.verifyUser(token);
  }

  verifyUser = async token => {
    try {
      const response = await axios.get(
        `${process.env.BASE_URL}users/verify/${token}`
      );
      this.setState({ successResponse: response.data.data.message });
    } catch (error) {
      if (error.response.status === 400) {
        this.setState({ failureResponse: error.response.data.data.message });
      }
    }
  };
  render() {
    const { successResponse, failureResponse } = this.state;
    return (
      <div>
        {successResponse ? (
          <div className="container">
            <div className="row pt-5">
              <div className="mx-auto confirm_verification pt-3">
                <IconComponent
                  alt="verify account image"
                  className="img-fluid"
                  src="./../src/assets/images/confirm.svg"
                />
                <h6 className="pt-4 text-center">
                  {' '}
                  {successResponse === 'User successfully verified' ? (
                    <div>
                      You have successfully verified your account.{' '}
                      <Link to="/compose"> Create Article </Link>
                    </div>
                  ) : (
                    ''
                  )}{' '}
                </h6>
              </div>
            </div>
          </div>
        ) : (
          <div className="container">
            <div className="row pt-5">
              <div className="mx-auto confirm_verification  pt-3">
                <IconComponent
                  alt="verify account image"
                  className="img-fluid"
                  src="./../src/assets/images/warning.svg"
                />
                <h6 className="pt-4 text-center">
                  {' '}
                  {failureResponse === 'This token has expired' ? (
                    <div>
                      Oops! Your account has been verified already.{' '}
                      <Link to="/compose"> Create your first article </Link>
                    </div>
                  ) : (
                    failureResponse
                  )}{' '}
                </h6>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

VerifyUser.propTypes = {
  location: PropTypes.object.isRequired
};

export default VerifyUser;
