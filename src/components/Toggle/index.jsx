/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import './Toggle.scss';

const Toggle = ({ classToggle, handleClick, handleClicker }) => {
  return (
    <div>
      <div
        onKeyDown={handleClicker}
        className={`toggle-button ${classToggle} `}
        onClick={handleClick}
      >
        <button
          className={`${classToggle} toggle`}
          onClick={handleClicker}
        ></button>
      </div>
    </div>
  );
};

Toggle.propTypes = {
  classToggle: PropTypes.string,
  handleClick: PropTypes.func,
  handleClicker: PropTypes.func
};

export default Toggle;
