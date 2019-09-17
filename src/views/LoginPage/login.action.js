import * as types from '../../actionTypes';
import axios from '../../utils/axiosConfig';
import { toast } from 'react-toastify';
import { setCurrentUser } from '../Auth/auth.action';

export const logInUser = user => {
  return { type: types.LOG_IN_USER, payload: user };
};

export const logInUserError = error => {
  return { type: types.LOG_IN_USER_ERROR, payload: error };
};

export const logInRequest = (user, history) => {
  return async dispatch => {
    try {
      const response = await axios.post('users/login', user);
      if (response.status === 200) {
        const { data } = response.data;
        localStorage.setItem('user', JSON.stringify(data));
        toast.success('Log In Successful');

        setTimeout(() => {
          /* istanbul ignore next */
          // dispatch auth
          dispatch(setCurrentUser(data));
          history.push('/publication');
        }, 3000);
        dispatch(logInUser(data));
      }
    } catch (error) {
      /* istanbul ignore next */
      if (error.message === 'Network Error') {
        return toast.error('Something went wrong. Please try Again');
      }
      /* istanbul ignore next */
      const { message } = error.response.data.data;
      /* istanbul ignore next */
      toast.error('Invalid email/password provided');
      /* istanbul ignore next */
      dispatch(logInUserError(message));
    }
  };
};
