/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/index.jsx';
import Input from '../Input/index.jsx';
import Button from '../Button/index.jsx';
import TextArea from '../TextArea/index.jsx';
import './editProfile.scss';

const EditProfile = React.forwardRef((props, ref) => {
  const image = props.selectedImage ? props.selectedImage : props.image;
  const isNotifyActive = props.isNotifyActive;
  return (
    <Modal
      show={props.showEditModal}
      lightTheme={props.lightTheme}
      handleClose={props.handleClose}
      handleShow={props.handleShow}
    >
      <div className="edit-profile-container">
        <form
          className="input-panel-signup col-md-12"
          onSubmit={props.updateHandler}
        >
          <div className="row edit-profile-image-container">
            <img src={image} alt="avatar" className="edit-profile-image" />
            <input
              type="file"
              ref={ref}
              className="display-hidden"
              onChange={props.imageHandler}
              accept="image/png, image/jpeg"
            />
            {props.lightTheme ? (
              <img
                src="../../../src/assets/images/camera-dark.svg"
                alt="change"
                className="edit-profile-icon"
                onClick={() => ref.current.click()}
              />
            ) : (
              <img
                src="../../../src/assets/images/camera.svg"
                alt="change"
                className="edit-profile-icon"
                onClick={() => ref.current.click()}
              />
            )}
          </div>
          <div>
            <Input
              placeholder="First Name"
              handleChange={e => props.handleChange(e, 'firstName')}
              name="firstName"
              type="text"
              lightTheme={props.lightTheme}
              customClassName="edit-first-name"
            />
          </div>
          <div>
            <Input
              placeholder="Last Name"
              handleChange={e => props.handleChange(e, 'lastName')}
              name="lastName"
              type="text"
              lightTheme={props.lightTheme}
              customClassName="edit-last-name"
            />
          </div>
          <div>
            <Input
              placeholder="User Name"
              handleChange={e => props.handleChange(e, 'userName')}
              name="userName"
              type="text"
              lightTheme={props.lightTheme}
              customClassName="edit-user-name"
              required={!props.userNameRequired}
            />
          </div>
          <div>
            <TextArea
              placeholder="Bio"
              handleChange={e => props.handleChange(e, 'bio')}
              name="bio"
              id="bio"
              lightTheme={props.lightTheme}
              customClassName="edit-profile-text-area"
            />
          </div>
          <div className="display-flex edit-notification">
            <p>Turn your notification</p>
            {isNotifyActive ? (
              <div className="pl-2 activate" onClick={props.notifyHandler}>
                <p>off</p>
              </div>
            ) : (
              <div className="pl-2 activate" onClick={props.notifyHandler}>
                <p>on</p>
              </div>
            )}
          </div>
          <div>
            <Button customClassName="edit-profile-submit">Submit</Button>
          </div>
        </form>
      </div>
    </Modal>
  );
});

EditProfile.propTypes = {
  lightTheme: PropTypes.bool,
  selectedImage: PropTypes.string,
  image: PropTypes.string,
  handleClose: PropTypes.func,
  showEditModal: PropTypes.bool,
  userNameRequired: PropTypes.bool,
  handleShow: PropTypes.func,
  updateHandler: PropTypes.func,
  imageHandler: PropTypes.func,
  handleChange: PropTypes.func,
  isNotifyActive: PropTypes.bool,
  notifyHandler: PropTypes.func
};

export default EditProfile;
