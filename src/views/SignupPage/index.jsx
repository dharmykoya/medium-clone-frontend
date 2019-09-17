/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-useless-escape */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import IconComponent from '../../components/IconComponent/index.jsx';
import Input from '../../components/Input/index.jsx';
import Button from '../../components/Button/index.jsx';
import { authSignup } from './signup.action';
import Loading from '../../components/LoadingIndicator/index.jsx';
import '../../styles/main.scss';
import './signup.scss';

export class SignupPage extends Component {
  state = {
    userData: {
      firstName: {
        elementtype: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'First Name',
          required: true
        },
        value: '',
        validation: {
          required: true,
          string: true
        },
        valid: true
      },
      lastName: {
        elementtype: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Last Name',
          required: true
        },
        value: '',
        validation: {
          required: true,
          string: true
        },
        valid: true
      },
      email: {
        elementtype: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email',
          required: true
        },
        value: '',
        validation: {
          required: true,
          email: true
        },
        valid: true
      },
      password: {
        elementtype: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Your Password',
          required: true
        },
        value: '',
        validation: {
          required: true,
          minLength: 8,
          password: true
        },
        valid: true
      }
    }
  };

  handleChange = (event, inputName) => {
    const { userData } = this.state;
    const updatedUserData = {
      ...userData
    };

    const updatedFormElement = {
      ...updatedUserData[inputName]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedUserData[inputName] = updatedFormElement;

    this.setState({ userData: updatedUserData });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { userData } = this.state;
    const inputNames = Object.keys(userData);
    const loginDetails = {};
    inputNames.forEach(name => {
      loginDetails[name] = userData[name].value;
    });

    this.props.signup(loginDetails, this.props.history);
  };
  handleAuth = async (e, id) => {
    e.preventDefault();
    window.location = `${process.env.BASE_URL}auth/${id}`;
  };

  checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.password) {
      const pattern = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})');
      isValid = pattern.test(value) && isValid;
    }
    if (rules.string) {
      const letters = /^[A-Za-z]+$/;
      isValid = value.match(letters) && isValid;
    }
    if (rules.email) {
      const email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      isValid = value.match(email) && isValid;
    }

    return isValid;
  };

  render() {
    const { userData } = this.state;
    const InputNames = Object.keys(userData);

    const formElementsArray = [];

    InputNames.forEach(input => {
      formElementsArray.push({
        id: input,
        config: userData[input]
      });
    });

    let signUpButton = <Button customClassName="signup-button">Sign Up</Button>;

    if (this.props.loading) {
      signUpButton = <Loading />;
    }

    return (
      <div className="container signup">
        <h1>Create an Account</h1>
        <div className="row main-section-signup">
          <div className="col-md-6 hero-panel-signup">
            <IconComponent
              src={'./../src/assets/images/authhero.svg'}
              alt={'image asset'}
            />
            <h5 className={this.props.lightTheme ? '' : 'light-signup-hero'}>
              Have an account already?{' '}
              <span>
                <Link to="/login">Login</Link>
              </span>
            </h5>
          </div>
          <form
            className="input-panel-signup col-md-6"
            onSubmit={this.handleSubmit}
          >
            <div>
              {this.state.userData.firstName.valid && !this.props.error ? (
                ''
              ) : (
                <span className="input-validation-error first-name-error">
                  <p className="input-error-message-front-end">
                    {this.state.userData.firstName.valid
                      ? ''
                      : 'first name can not be empty and cannot contain a number'}
                  </p>
                  {this.props.error
                    ? `${this.props.error.firstName || ''}`
                    : ''}
                </span>
              )}
              <Input
                placeholder="First Name"
                handleChange={e => this.handleChange(e, 'firstName')}
                customClassName="signup-input signup-firstName col-sm-12"
                name="firstName"
                type="text"
                required
                lightTheme={this.props.lightTheme}
              />
            </div>
            <div>
              {this.state.userData.lastName.valid && !this.props.error ? (
                ''
              ) : (
                <span className="input-validation-error last-name-error">
                  <p className="input-error-message-front-end">
                    {this.state.userData.lastName.valid
                      ? ''
                      : 'last name can not be empty and cannot contain a number'}
                  </p>
                  {this.props.error ? `${this.props.error.lastName || ''}` : ''}
                </span>
              )}
              <Input
                placeholder="Last Name"
                handleChange={e => this.handleChange(e, 'lastName')}
                customClassName="signup-input signup-lastName col-sm-12"
                name="lastName"
                type="text"
                required
                lightTheme={this.props.lightTheme}
              />
            </div>
            <div>
              {this.state.userData.email.valid && !this.props.error ? (
                ''
              ) : (
                <span className="input-validation-error email-error">
                  <p className="input-error-message-front-end">
                    {this.state.userData.email.valid
                      ? ''
                      : 'email must be a valid email'}
                  </p>
                  {this.props.error ? `${this.props.error.email || ''}` : ''}
                </span>
              )}
              <Input
                placeholder="Email"
                handleChange={e => this.handleChange(e, 'email')}
                customClassName="signup-input signup-email col-sm-12"
                name="email"
                type="email"
                required
                lightTheme={this.props.lightTheme}
              />
            </div>
            <div>
              {this.state.userData.password.valid && !this.props.error ? (
                ''
              ) : (
                <span className="input-validation-error password-error">
                  <p className="input-error-message-front-end">
                    {this.state.userData.password.valid
                      ? ''
                      : 'password must contain one capital letter, number and min of 8'}
                  </p>
                  {this.props.error ? `${this.props.error.password || ''}` : ''}
                </span>
              )}
              <Input
                placeholder="Password"
                handleChange={e => this.handleChange(e, 'password')}
                customClassName="signup-input signup-password col-sm-12"
                name="password"
                type="password"
                required
                lightTheme={this.props.lightTheme}
              />
            </div>
            {signUpButton}
            <div className="row signup-line-container">
              <hr className="signup-line first-line" />
              <p>Or</p>
              <hr className="signup-line second-line" />
            </div>

            <div className="signup-auth">
              <div
                className="button-twitter"
                onClick={e => this.handleAuth(e, 'twitter')}
              >
                <Button customClassName="signup-auth-button signup-button-twitter">
                  <IconComponent
                    src={'../../src/assets/images/twitter-signup.svg'}
                    alt={'twitter asset'}
                  />
                  <h5>Sign Up With Twitter</h5>
                </Button>
              </div>
              <div
                className="button-facebook"
                onClick={e => this.handleAuth(e, 'facebook')}
              >
                <Button customClassName="signup-auth-button signup-button-facebook">
                  <IconComponent
                    src={'../../src/assets/images/facebook-signup.svg'}
                    alt={'facebook asset'}
                  />
                  <h5>Sign Up With Facebook</h5>
                </Button>
              </div>
              <div
                className="button-google"
                onClick={e => this.handleAuth(e, 'google')}
              >
                <Button customClassName="signup-auth-button signup-button-google">
                  <IconComponent
                    src={'../../src/assets/images/google-signup.svg'}
                    alt={'google asset'}
                  />{' '}
                  <h5>Sign Up With Google</h5>
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

SignupPage.propTypes = {
  signup: PropTypes.func,
  lightTheme: PropTypes.bool,
  loading: PropTypes.bool,
  history: PropTypes.any,
  error: PropTypes.object
};
export const mapStateToProps = state => {
  return {
    lightTheme: state.theme.theme === 'light-theme',
    loading: state.signup.loading,
    noError: state.signup.error === null,
    error: state.signup.error
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    signup: (userDetails, history) => dispatch(authSignup(userDetails, history))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupPage);
