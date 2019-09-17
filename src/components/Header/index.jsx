import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { themeToggler } from './index.action';
import { logout } from '../../views/Auth/auth.action';
import Toggle from '../../components/Toggle/index.jsx';
import './Header.scss';
import IconComponent from '../IconComponent/index.jsx';
import Notification from '../Notifications/index.jsx';
import {
  getAllNotifications,
  updateNotification
} from '../Notifications/notification.action';

export class Header extends Component {
  constructor() {
    super();
    this.state = {
      toggle: 'switch',
      theme: 'light-theme',
      auth: {},
      openNav: 'hidden',
      notifyId: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleHamburger = this.handleHamburger.bind(this);
    this.countNotify = this.countNotify.bind(this);
    this.markNotificationRead = this.markNotificationRead.bind(this);
    this.app_theme = localStorage.getItem('app_theme');
  }

  componentWillMount() {
    //dispatch the action
    this.props.getAllNotifications();
    if (this.app_theme === null) {
      // dispatch an action
      this.props.themeToggler('dark-theme');
    }
    if (this.app_theme !== null) {
      // dispatch an action
      this.props.themeToggler(this.app_theme);
      document.body.classList.toggle(this.app_theme);
      // update state
      this.app_theme === 'light-theme'
        ? this.setState({ toggle: '', theme: 'dark-theme' })
        : '';
    }
  }

  countNotify() {
    const { notifications } = this.props.Notifications;
    if (notifications) {
      let initialCount = notifications.filter(item => item.isRead === false);
      return initialCount.length;
    }
  }

  markNotificationRead(e, id) {
    // update notification
    this.props.updateNotification(id);
  }

  handleLogOut(e) {
    e.preventDefault();
    this.props.logout(this.props.history);
  }

  handleHamburger() {
    this.state.openNav === 'hidden'
      ? this.setState({ openNav: 'show' })
      : this.setState({ openNav: 'hidden' });
  }

  handleClick() {
    if (this.app_theme !== null && this.app_theme === 'dark-theme') {
      document.body.classList.remove('dark-theme');
    }
    document.body.classList.toggle('light-theme');
    this.state.toggle === 'switch'
      ? this.setState({ toggle: '', theme: 'dark-theme' })
      : this.setState({ toggle: 'switch', theme: 'light-theme' });
    this.props.themeToggler(this.state.theme);
    // store user preference
    localStorage.setItem('app_theme', this.state.theme);
  }

  render() {
    const { toggle } = this.state;
    const { notifications } = this.props.Notifications;
    const { theme } = this.props.theme;
    const { isAuthenticated, user } = this.props.auth;
    const { image } = user;
    const notifyCount = this.countNotify();
    const { openNav } = this.state;
    return (
      <React.Fragment>
        <nav
          className={`${theme} navbar navbar-expand-lg navbar-light nav-shadow`}
        >
          <div className="container p-0">
            <div className="navbar-logo">
              <Link to="/">
                <h3 className="m-0">Author's Haven</h3>
              </Link>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={this.handleHamburger}
            >
              <span className={` navbar-toggler`}>
                <div className={`${theme}`}></div>
                <div className={`${theme}`}></div>
                <div className={`${theme}`}></div>
              </span>
            </button>

            <div
              className={`${openNav} collapse navbar-collapse`}
              id="navbarSupportedContent"
            >
              <hr className="border-1" />
              <div className="navbar-nav ml-auto">
                <div className="mr-4 mt-1 display-flex  m-all">
                  <div className="mr-1">
                    {theme === 'light-theme' ? (
                      <IconComponent
                        src="./../src/assets/images/sun-dark-mode.svg"
                        alt="sun-dark-mode"
                      />
                    ) : (
                      <IconComponent
                        src="./../src/assets/images/sun-light-mode.svg"
                        alt="sun-light-mode"
                      />
                    )}
                  </div>
                  <Toggle classToggle={toggle} handleClick={this.handleClick} />
                  <div className="ml-1">
                    {theme === 'light-theme' ? (
                      <IconComponent
                        src="./../src/assets/images/moon-dark-mode.svg"
                        alt="moon-dark-mode"
                      />
                    ) : (
                      <IconComponent
                        src="./../src/assets/images/moon-light-mode.svg"
                        alt="moon-light-mode"
                      />
                    )}
                  </div>
                </div>

                {isAuthenticated === false ? (
                  <React.Fragment>
                    <Link
                      to="/signup"
                      className="button  navbtn_signup button-normal border-0 pr-3 pl-3  pb-1 mr-4 m-all"
                    >
                      Sign Up
                    </Link>

                    <Link
                      to="/login"
                      className="button  navbtn_login button-inverse pr-3 pl-3   pb-1  mr-4 m-all"
                    >
                      Login
                    </Link>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <div className="notification dropdown">
                      <i className="ion-ios-bell-outline pr-2"></i>

                      {notifyCount !== 0 ? (
                        <span className="badge notification-badge badge-danger">
                          {' '}
                          {notifyCount}{' '}
                        </span>
                      ) : (
                        ''
                      )}
                      <div className={`${theme} drop dropdown-fill tray`}>
                        <Notification
                          notification={notifications}
                          handleIsread={this.markNotificationRead}
                        />
                      </div>
                    </div>
                    <Link
                      to="/compose"
                      className="button compose-btn  navbtn_signup button-normal border-0 pr-3 pl-3  pb-1 mr-4 m-all"
                    >
                      Compose
                    </Link>
                    <div className="dropdown">
                      <div className="dropdown_btn">
                        {' '}
                        <IconComponent
                          id="userProfile"
                          alt="user profile page"
                          src={image ? image : ''}
                          className="user icon-medium rounded-circle"
                        />
                      </div>

                      <div className={`${theme} dropdown-fill`}>
                        <Link to="/publication" className="logout">
                          Publications
                        </Link>
                        <Link to="/draft" className="logout">
                          Draft
                        </Link>
                        <Link to="/bookmark" className="logout">
                          Bookmarks
                        </Link>
                        <Link to="/followers" className="logout">
                          Followers
                        </Link>
                        <Link
                          onClick={this.handleLogOut.bind(this)}
                          to="/"
                          className="logout m-all"
                        >
                          <i className="ion-log-out dropdown_icon pr-2"></i>Log
                          Out
                        </Link>
                      </div>
                    </div>
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

Header.propTypes = {
  themeToggler: PropTypes.func.isRequired,
  theme: PropTypes.object,
  auth: PropTypes.object,
  logout: PropTypes.func,
  history: PropTypes.object,
  Notifications: PropTypes.object,
  getAllNotifications: PropTypes.func,
  updateNotification: PropTypes.func
};

const mapStateToProps = state => ({
  theme: state.theme,
  auth: state.auth,
  Notifications: state.notifications
});

export default connect(
  mapStateToProps,
  { themeToggler, logout, getAllNotifications, updateNotification }
)(Header);
