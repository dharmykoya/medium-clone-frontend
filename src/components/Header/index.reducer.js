import { APP_THEME, OPEN_NAVBAR, CLOSE_NAVBAR } from '../../actionTypes';

const initialSate = {
  Nav: 'hidden'
};

export default (state = initialSate, action) => {
  switch (action.type) {
    case APP_THEME:
      return {
        ...state,
        theme: action.payload
      };
    case OPEN_NAVBAR:
      return {
        ...state,
        Nav: action.payload
      };
    case CLOSE_NAVBAR:
      return {
        ...state,
        Nav: action.payload
      };
    default:
      return state;
  }
};
