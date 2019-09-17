import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import './index.scss';
import Button from '../../components/Button/index.jsx';
import PropTypes from 'prop-types';
import EditProfile from '../EditProfile/index.jsx';
import { updateProfile } from '../EditProfile/editProfile.action';

export class ProfileNavbar extends Component {
  state = {
    showEditModal: false,
    selectedImage: '',
    image: [],
    userData: {
      firstName: {
        value: ''
      },
      lastName: {
        value: ''
      },
      userName: {
        value: ''
      },
      bio: {
        value: ''
      }
    },
    isNotifyActive: true
  };
  componentDidMount() {
    this.setState({ isNotifyActive: this.props.auth.user.isNotifyActive });
    if (!this.props.auth.user.userName) {
      this.setState({
        showEditModal: true
      });
    }
  }
  ref = React.createRef();

  handleClose = () => {
    const updatedState = {
      ...this.state.userData
    };
    updatedState.firstName.value = '';
    updatedState.lastName.value = '';
    updatedState.userName.value = '';
    updatedState.bio.value = '';
    if (this.props.auth.user.userName) {
      this.setState({
        showEditModal: false,
        selectedImage: '',
        image: [],
        userData: updatedState
      });
    } else {
      toast.error('Please update your profile with a user name to continue');
    }
  };

  handleShow = () => {
    this.setState({ showEditModal: true });
  };
  imageHandler = e => {
    // get the file uploaded
    const files = e.target.files;

    //check if file exist
    if (files && files[0]) {
      // check if file type is any image format

      /* istanbul ignore next */
      if (files[0].size > 1028643) {
        /* istanbul ignore next */
        toast.error('Please select an image less than 1mb.');
      }
      this.setState({ image: files[0] });
      // initializes file reader
      /* istanbul ignore next */
      const reader = new FileReader();
      /* istanbul ignore next */
      reader.onload = e => {
        // extract the image file and set it to state
        /* istanbul ignore next */
        this.setState({ selectedImage: e.target.result });
      };
      /* istanbul ignore next */
      reader.readAsDataURL(files[0]);
    }
  };

  handleChange = (event, inputName) => {
    const { userData } = this.state;
    const updatedUserData = {
      ...userData
    };
    const updatedFormElement = {
      ...updatedUserData[inputName]
    };
    updatedFormElement.value = event.target.value;
    updatedUserData[inputName] = updatedFormElement;
    this.setState({ userData: updatedUserData });
  };

  handleNotify = () => {
    this.state.isNotifyActive === true
      ? this.setState({ isNotifyActive: false })
      : this.setState({ isNotifyActive: true });
  };

  updateHandler = async e => {
    e.preventDefault();
    const formData = new FormData();

    formData.append(
      'firstName',
      this.state.userData.firstName.value || this.props.firstName
    );
    formData.append(
      'lastName',
      this.state.userData.lastName.value || this.props.lastName
    );
    formData.append(
      'userName',
      this.state.userData.userName.value || this.props.userName
    );
    formData.append('isNotifyActive', this.state.isNotifyActive);
    formData.append('bio', this.state.userData.bio.value || this.props.bio);
    formData.append('image', this.state.image);

    await this.props.updateUserProfile(formData, this.props.auth.user.token);
    /* istanbul ignore next */
    if (this.props.updatedProfileData.error === null) {
      console.log('releh');
      /* istanbul ignore next */
      this.setState({
        showEditModal: false,
        selectedImage: '',
        image: []
      });
      /* istanbul ignore next */
      window.location.reload();
    }
  };
  render() {
    let profileNavbarClass = ['navbar-container', 'dark-theme'];
    let btnClass = ['btn-navbar', 'btn-dark'];
    if (this.props.lightTheme) {
      profileNavbarClass.pop();
      btnClass.pop();
      profileNavbarClass.push('light-theme');
    }

    const name = `${this.props.firstName} ${this.props.lastName}`;
    return (
      <div className={profileNavbarClass.join(' ')}>
        <div className="row profile-navbar flex">
          <div className="profile">
            <img
              src={
                this.props.image
                  ? this.props.image
                  : 'https://res.cloudinary.com/fxola/image/upload/v1562711912/ezkc4mj7pktwzqhmrbpt.png'
              }
              className="float-left profileImage"
              alt="author"
            />

            <p>
              {name}
              <br />
              <small>@{this.props.userName}</small>
            </p>
          </div>

          <div className="profile-navbar-button">
            <Button
              customClassName={btnClass.join(' ')}
              handleclick={this.handleShow}
            >
              Edit profile
            </Button>
          </div>
        </div>
        <div className="tabs-container">
          <ul className="row tabs">
            <li
              className={this.props.active === 'published' ? 'tab-focus' : ''}
            >
              <Link to="/publication">Publications</Link>
            </li>
            <li className={this.props.active === 'draft' ? 'tab-focus' : ''}>
              <Link to="/draft">Drafts</Link>
            </li>
            <li className={this.props.active === 'bookmark' ? 'tab-focus' : ''}>
              <Link to="/bookmark">Bookmarks</Link>
            </li>
            <li
              className={this.props.active === 'followers' ? 'tab-focus' : ''}
            >
              <Link to="/followers">Followers</Link>
            </li>
          </ul>
        </div>
        <EditProfile
          handleClose={this.handleClose}
          handleShow={this.handleShow}
          showEditModal={this.state.showEditModal}
          lightTheme={this.props.lightTheme}
          ref={this.ref}
          handleChange={this.handleChange}
          updateHandler={this.updateHandler}
          imageHandler={this.imageHandler}
          selectedImage={this.state.selectedImage}
          userNameRequired={!!this.props.auth.user.userName}
          isNotifyActive={this.state.isNotifyActive}
          notifyHandler={this.handleNotify}
          image={
            this.props.image ||
            'https://res.cloudinary.com/fxola/image/upload/v1562711912/ezkc4mj7pktwzqhmrbpt.png'
          }
        />
      </div>
    );
  }
}

ProfileNavbar.propTypes = {
  lightTheme: PropTypes.bool,
  userDetails: PropTypes.object,
  updatedProfileData: PropTypes.object,
  auth: PropTypes.object,
  authorImage: PropTypes.any,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  updateUserProfile: PropTypes.func,
  username: PropTypes.string,
  active: PropTypes.string,
  image: PropTypes.string,
  selectedImage: PropTypes.string,
  userName: PropTypes.string,
  bio: PropTypes.string,
  isNotifyActive: PropTypes.bool
};
export const mapStateToProps = state => {
  return {
    lightTheme: state.theme.theme === 'light-theme',
    auth: state.auth,
    updatedProfileData: state.editProfile
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    updateUserProfile: (userDetail, token) =>
      dispatch(updateProfile(userDetail, token))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileNavbar);
