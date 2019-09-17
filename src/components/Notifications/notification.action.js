import {
  GET_NOTIFICATION_START,
  GET_NOTIFICATION_SUCCESS
} from '../../actionTypes';
import axios from 'axios';

export const getAllNotifications = () => dispatch => {
  dispatch(getNotificationStart());
  // get user token
  let tokenId;
  const user = localStorage.getItem('user');
  /* istanbul ignore next */
  if (user) {
    const { token } = JSON.parse(user);
    tokenId = token;
  }
  return axios
    .get(`${process.env.BASE_URL}notifications`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${tokenId}`
      }
    })
    .then(res => {
      const { data } = res.data;

      dispatch(getNotificationSuccess(data.reverse()));
    });
};

export const getNotificationStart = () => {
  return {
    type: GET_NOTIFICATION_START
  };
};
/* istanbul ignore next */
export const getNotificationSuccess = res => {
  return {
    type: GET_NOTIFICATION_SUCCESS,
    payload: res
  };
};

export const updateNotification = id => dispatch => {
  dispatch(getNotificationStart());
  // get user token
  let tokenId;
  /* istanbul ignore next */
  const user = localStorage.getItem('user');
  /* istanbul ignore next */
  if (user) {
    const { token } = JSON.parse(user);
    tokenId = token;
  }
  return axios
    .put(`${process.env.BASE_URL}notifications/${id}`, null, {
      headers: {
        authorization: `Bearer ${tokenId}`
      }
    })
    .then();
};
