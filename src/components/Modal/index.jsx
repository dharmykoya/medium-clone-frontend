import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const Modal = ({ handleClose, show, children, lightTheme }) => {
  const showHideClassname = show
    ? 'modal-cover display-block'
    : 'modal-cover display-none';

  let modalClass = ['modal-main', 'dark'];
  if (lightTheme) {
    modalClass.pop();
    modalClass.push('light');
  }

  return (
    <div className={showHideClassname}>
      <section className={modalClass.join(' ')}>
        <div className="closeIconDiv">
          <span aria-hidden="true" className="closeIcon" onClick={handleClose}>
            &times;
          </span>
        </div>
        <div className="modal-body"> {children} </div>
      </section>
    </div>
  );
};

Modal.propTypes = {
  handleClose: PropTypes.func,
  show: PropTypes.bool,
  children: PropTypes.node,
  lightTheme: PropTypes.bool
};
export default Modal;
