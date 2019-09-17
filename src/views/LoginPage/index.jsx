import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import IconComponent from '../../components/IconComponent/index.jsx';
import Input from '../../components/Input/index.jsx';
import Loader from '../../components/LoadingIndicator/index.jsx';
import { logInRequest } from './login.action';
import '../../styles/main.scss';
import './style.scss';
export class LoginPage extends Component {
  state = {
    email: '',
    password: '',
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
    await this.props.logInRequest(this.state, this.props.history);
    this.setState({ isLoading: false });
  };
  handleAuth = async (e, id) => {
    e.preventDefault();
    window.location = `${process.env.BASE_URL}auth/${id}`;
  };
  render() {
    const { theme } = this.props.theme;
    const inputClass =
      theme === 'light-theme'
        ? 'login-input login-light'
        : 'login-input login-dark';
    const text = theme === 'light-theme' ? 'no-account' : '';
    return (
      <div className="container">
        <h1>Sign In As An Existing User</h1>

        <div className="main-section ">
          <div className="hero-panel ">
            <IconComponent
              src={'./../src/assets/images/authhero.svg'}
              alt={'image asset'}
              className="icon"
            />

            <p className={text}>
              Don't have an account yet?
              <span className="sign-up-span">
                <Link to="/signup">Sign Up</Link>
              </span>
            </p>
          </div>
          <form className="login input-panel " onSubmit={this.handleSubmit}>
            <Input
              placeholder="Email"
              handleChange={this.handleChange}
              customClassName={inputClass}
              name="email"
              type="email"
              required
            />

            <Input
              placeholder="Password"
              handleChange={this.handleChange}
              customClassName={inputClass}
              name="password"
              type="password"
              required
            />
            <button className="login-button">
              {this.state.isLoading ? (
                <Loader className="loader-small" />
              ) : (
                'Sign In'
              )}
            </button>
            <span className="horizontal-line">
              <hr className="line" /> <p>Or</p> <hr className="line" />
            </span>

            <div className="social-auth">
              <button
                className="login-button-twitter"
                onClick={e => this.handleAuth(e, 'twitter')}
              >
                <span>
                  <IconComponent
                    src="./../src/assets/images/twitter-light.svg"
                    className="icon-small"
                    alt="twitter Icon"
                  />{' '}
                </span>
                <span>Sign In With Twitter</span>
              </button>
              <button
                className="login-button-facebook"
                onClick={e => this.handleAuth(e, 'facebook')}
              >
                <span>
                  <IconComponent
                    src="./../src/assets/images/facebook-light.svg"
                    className="icon-small"
                    alt="facebook Icon"
                  />{' '}
                </span>
                <span>Sign In With Facebook</span>
              </button>
              <button
                className="login-button-google"
                onClick={e => this.handleAuth(e, 'google')}
              >
                <span>
                  <IconComponent
                    src="./../src/assets/images/google-normal.svg"
                    className="icon-small"
                    alt="google Icon"
                  />{' '}
                </span>
                <span className="">Sign In With Google</span>
              </button>
            </div>
            <Link to="/forgot-password">Forgotten your Password?</Link>
          </form>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.object.isRequired,
  logInRequest: PropTypes.func.isRequired,
  theme: PropTypes.object
};

const mapStateToProps = state => ({
  theme: state.theme
});
export const mapDispatchToProps = dispatch => {
  return {
    logInRequest: async (userCredentials, history) => {
      return dispatch(await logInRequest(userCredentials, history));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
