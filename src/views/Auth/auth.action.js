import { SET_CURRENT_USER } from '../../actionTypes';

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logout = history => dispatch => {
  // remove token
  localStorage.removeItem('user');
  dispatch(setCurrentUser({}));
  history.push('/');
};
