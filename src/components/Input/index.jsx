import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const Input = ({
  customClassName,
  lightTheme,
  placeholder,
  handleBlur,
  handleChange,
  name,
  type,
  ...customProps
}) => {
  const themeColorClass = lightTheme
    ? 'form-input-light-theme'
    : 'form-input-dark-theme';
  return (
    <input
      {...customProps}
      placeholder={placeholder}
      onChange={handleChange}
      type={type}
      onBlur={handleBlur}
      className={`input ${themeColorClass} ${customClassName}`}
      name={name}
    />
  );
};

Input.propTypes = {
  customClassName: PropTypes.string,
  lightTheme: PropTypes.bool,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  attribute: PropTypes.string,
  type: PropTypes.string
};
export default Input;
