import React from 'react';
import './style.scss';
import PropTypes from 'prop-types';

const Loader = ({ className }) => {
  const loadingText = className === 'loader-small' ? '' : 'Loading..';
  return (
    <div className={`loader ${className}`}>
      <div className="loader-text">{loadingText}</div>
      <div className="loader-sector loader-sector-green"></div>
      <div className="loader-sector loader-sector-grey"></div>
      <div className="loader-sector loader-sector-dark-grey"></div>
    </div>
  );
};

Loader.propTypes = {
  className: PropTypes.string
};

export default Loader;
