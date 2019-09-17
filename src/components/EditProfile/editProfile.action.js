import axios from 'axios';
import * as actionTypes from '../../actionTypes/index';
import { toast } from 'react-toastify';

export const editProfileStart = () => {
  return {
    type: actionTypes.EDIT_PROFILE_START
  };
};

export const editProfileSuccess = userData => {
  return {
    type: actionTypes.EDIT_PROFILE_SUCCESS,
    userData
  };
};

export const editProfileFail = error => {
  return {
    type: actionTypes.EDIT_PROFILE_FAIL,
    error
  };
};

export const updateProfile = (userData, token) => {
  return dispatch => {
    dispatch(editProfileStart());
    return axios
      .put(
        'https://persephone-backend-staging.herokuapp.com/api/v1/users',
        userData,
        {
          headers: { authorization: `Bearer ${token}` }
        }
      )
      .then(response => {
        const { data } = response.data;
        const setUserData = {
          ...data,
          token
        };

        localStorage.setItem('user', JSON.stringify(setUserData));
        dispatch(editProfileSuccess(data));
      })
      .catch(error => {
        /* istanbul ignore next */
        toast.error(error.response.data.data.message);
        /* istanbul ignore next */
        dispatch(editProfileFail(error.response.data.data.message));
      });
  };
};
