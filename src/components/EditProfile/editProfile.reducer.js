import {
  EDIT_PROFILE_START,
  EDIT_PROFILE_FAIL,
  EDIT_PROFILE_SUCCESS
} from '../../actionTypes/index';

import { updateObject } from '../../utils/helper';

const initialState = {
  userData: null,
  loading: false,
  error: null
};

const editProfileStart = state => {
  return updateObject(state, {
    loading: true
  });
};
const editProfileSuccess = (state, action) => {
  return updateObject(state, {
    userData: action.userData,
    loading: false,
    error: null
  });
};
const editProfileFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

export default (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PROFILE_START:
      return editProfileStart(state, action);
    case EDIT_PROFILE_SUCCESS:
      return editProfileSuccess(state, action);
    case EDIT_PROFILE_FAIL:
      return editProfileFail(state, action);

    default:
      return state;
  }
};
