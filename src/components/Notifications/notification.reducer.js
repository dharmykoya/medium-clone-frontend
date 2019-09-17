import {
  GET_NOTIFICATION_START,
  GET_NOTIFICATION_SUCCESS
} from '../../actionTypes/index';

const initialState = {
  loading: false,
  notifications: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTIFICATION_START:
      return {
        ...state,
        loading: true
      };
    case GET_NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        notifications: action.payload
      };
    default:
      return state;
  }
};
