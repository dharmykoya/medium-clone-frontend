/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const Textarea = React.forwardRef((props, ref) => {
  const {
    customClassName,
    lightTheme,
    placeholder,
    handleChange,
    handleBlur,
    ...customProps
  } = props;
  const themeColorClass = lightTheme
    ? 'form-textarea-light-theme'
    : 'form-textarea-dark-theme';
  return (
    <textarea
      {...customProps}
      placeholder={placeholder}
      onChange={handleChange}
      onBlur={handleBlur}
      className={`textarea ${themeColorClass} ${customClassName}`}
      ref={ref}
    />
  );
});

Textarea.propTypes = {
  lightTheme: PropTypes.bool,
  customClassName: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func
};

export default Textarea;
