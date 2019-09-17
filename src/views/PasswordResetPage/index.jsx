import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../../components/Input/index.jsx';
import Loader from '../../components/LoadingIndicator/index.jsx';
import { passwordResetRequest } from './passwordReset.action';
import './style.scss';
export class PasswordResetPage extends Component {
  state = {
    password: '',
    confirmPassword: '',
    invalid: false,
    isLoading: false
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleBlur = e => {
    let feedback = '';

    if (e.target.name === 'password') {
      const pattern = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})');
      if (!pattern.test(e.target.value)) {
        feedback =
          'Password must contain one capital letter, number and min of 8';
        this.setState({ invalid: true });
      }
    }

    if (e.target.name === 'confirmPassword') {
      if (e.target.value !== this.state.password) {
        feedback = 'Passwords must match';
        this.setState({ invalid: true });
      } else {
        this.setState({ invalid: false });
      }
    }

    document.getElementById('invalid-message').textContent = feedback;
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ isLoading: true });
    await this.props.passwordResetRequest(
      this.props.location.search,
      this.props.history,
      {
        password: this.state.password
      }
    );
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
          <p className=" text-left" id="invalid-message"></p>
          <h1 className="text-left password-color-adapt">
            Forgotten your password?
          </h1>
          <p className="text-sm-left">Enter a new password below</p>

          <Input
            placeholder="New Password"
            handleBlur={this.handleBlur}
            handleChange={this.handleChange}
            customClassName="input-password-reset"
            name="password"
            type="password"
            lightTheme={isLightTheme}
            required
          />
          <Input
            placeholder="Re-enter Password"
            handleBlur={this.handleBlur}
            handleChange={this.handleChange}
            customClassName="input-password-reset"
            name="confirmPassword"
            type="password"
            lightTheme={isLightTheme}
            required
          />

          {this.state.isLoading ? (
            <Loader className="form-loader" />
          ) : (
            <button disabled={this.state.invalid} className="login-button">
              Reset Password{' '}
            </button>
          )}
        </form>
      </div>
    );
  }
}

PasswordResetPage.propTypes = {
  theme: PropTypes.object,
  passwordResetRequest: PropTypes.func,
  location: PropTypes.object,
  history: PropTypes.object
};

export const mapDispatchToProps = dispatch => {
  return {
    passwordResetRequest: async (location, history, newPassword) => {
      return dispatch(
        await passwordResetRequest(location, history, newPassword)
      );
    }
  };
};

const mapStateToProps = state => ({
  theme: state.theme
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordResetPage);
