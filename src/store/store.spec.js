import { createStore } from 'redux';
import rootReducer from './rootReducer';
import { themeToggler } from '../components/Header/index.action';

it('should create action', () => {
  const store = createStore(rootReducer, {});
  const app_theme = {
    theme: 'light-theme'
  };

  const action = themeToggler(app_theme);
  store.dispatch(action);

  const new_app_theme = store.getState().theme;
  expect(new_app_theme.theme).toEqual(app_theme);
});
