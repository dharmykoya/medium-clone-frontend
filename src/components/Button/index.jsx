import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const Button = ({ customClassName, children, isInverse, handleclick }) => {
  const buttonTypeClassName = isInverse ? 'button-inverse' : 'button-normal';
  return (
    <button
      className={`button ${buttonTypeClassName} ${customClassName}`}
      onClick={handleclick}
    >
      <span>{children}</span>
    </button>
  );
};

Button.propTypes = {
  customClassName: PropTypes.string,
  children: PropTypes.any,
  isInverse: PropTypes.bool,
  handleclick: PropTypes.func
};

export default Button;
