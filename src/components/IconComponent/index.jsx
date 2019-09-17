/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

/**
 *  Sample Usage
 *  <IconComponent
 *      src={'./../src/assets/images/twitter-dark.svg'}
 *      alt={'image asset'}
 *      className={'icon-large'}
 *  />
 */

const IconComponent = ({ className, src, alt, handleclick }) => {
  return (
    <img className={className} src={src} alt={alt} onClick={handleclick} />
  );
};

IconComponent.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  handleclick: PropTypes.any
};

export default IconComponent;
