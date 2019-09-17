import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Footer.scss';
import IconComponent from '../IconComponent/index.jsx';

export class Footer extends React.Component {
  render() {
    const { theme } = this.props.theme;
    return (
      <div className={`footer ${theme} pt-5`}>
        <div className="container-fluid">
          <div className="row pl-4 pr-4">
            <div className="col-md-3 mx-xs-auto">
              <div className="social_links">
                <h5>Connect with Us</h5>
                <ul className="nav pt-3">
                  <li className="nav-item mr-4">
                    <Link to="/">
                      {theme === 'light-theme' ? (
                        <IconComponent
                          src="./../src/assets/images/google-plus.svg"
                          alt="google plus"
                        />
                      ) : (
                        <IconComponent
                          src="./../src/assets/images/google-plus-light.svg"
                          alt="google plus light"
                        />
                      )}
                    </Link>
                  </li>
                  <li className="nav-item mr-4">
                    <Link to="/">
                      {theme === 'light-theme' ? (
                        <IconComponent
                          src="./../src/assets/images/facebook.svg"
                          alt="facebook"
                        />
                      ) : (
                        <IconComponent
                          src="./../src/assets/images/facebook-light.svg"
                          alt="facebook light"
                        />
                      )}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/">
                      {theme === 'light-theme' ? (
                        <IconComponent
                          src="./../src/assets/images/twitter.svg"
                          alt="twitter"
                        />
                      ) : (
                        <IconComponent
                          src="./../src/assets/images/twitter-light.svg"
                          alt="twitter light"
                        />
                      )}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-7"></div>
            <div className="address col-md-2 pt-xs-5 pt-md-4 ">
              <p> HQ- Internet </p>
              <p>
                234 Ikorodu road, Ilupeju <br /> Lagos, <br /> Nigeria
              </p>
            </div>
          </div>
        </div>
        <div className="copyright text-center pt-5 pb-2">
          <p>&copy; Team Persephone {new Date().getFullYear()}</p>
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  theme: PropTypes.object
};

const mapStateToProps = state => ({
  theme: state.theme
});

export default connect(mapStateToProps)(Footer);
