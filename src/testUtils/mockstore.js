import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../store/rootReducer';
import { middleware } from '../store/index';

export const testStore = initialState => {
  const setupStore = applyMiddleware(...middleware)(createStore);
  return setupStore(rootReducer, initialState);
};
