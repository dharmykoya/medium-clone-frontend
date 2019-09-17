import { APP_THEME } from '../../actionTypes';

export const themeToggler = theme => {
  return {
    type: APP_THEME,
    payload: theme
  };
};
