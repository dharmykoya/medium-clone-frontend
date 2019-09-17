import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../../components/Input/index.jsx';
import Loader from '../../components/LoadingIndicator/index.jsx';
import { forgotPasswordRequest } from './forgotPassword.action';
import './style.scss';
export class ForgotPasswordPage extends Component {
  state = {
    email: '',
    isLoading: false
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ isLoading: true });
    await this.props.forgotPasswordRequest(this.state);
    this.setState({ isLoading: false });
  };

  render() {
    const { theme } = this.props.theme;
    const isLightTheme = theme === 'light-theme';

    return (
      <div className="container password-reset-container">
        <form
          className="col-6 m-auto form-password-reset"
          onSubmit={this.handleSubmit}
        >
          <h1 className="text-left password-color-adapt">
            Forgotten your password?
          </h1>
          <p className="text-sm-left">
            Enter your email address to reset your password. You may need to
            check your spam folder
          </p>
          <Input
            placeholder="Existing Email Address"
            handleChange={this.handleChange}
            customClassName="input-password-reset"
            name="email"
            type="email"
            lightTheme={isLightTheme}
            required
          />

          {this.state.isLoading ? (
            <Loader className="form-loader" />
          ) : (
            <button className="login-button">Submit </button>
          )}
        </form>
      </div>
    );
  }
}

ForgotPasswordPage.propTypes = {
  theme: PropTypes.object,
  forgotPasswordRequest: PropTypes.func
};

export const mapDispatchToProps = dispatch => {
  return {
    forgotPasswordRequest: async email => {
      return dispatch(await forgotPasswordRequest(email));
    }
  };
};

const mapStateToProps = state => ({
  theme: state.theme
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordPage);
