import {
  IS_LOADING,
  GET_CURRENT_USER_SUCCESS,
  AUTH_FAILED,
  LOG_OUT_USER_SUCCESS,
} from './index';
const initialState = {
  currentUser: {},
  isSignedIn: false,
  errorMessage: '',
};

export const ReducerAuth = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.currentUser,
        isSignedIn: true,
      };
    case AUTH_FAILED:
      return {
        ...state,
        errorMessage: action.error,
      };
    case LOG_OUT_USER_SUCCESS:
      return {
        ...state,
        currentUser: {},
        isSignedIn: false,
      };
    default:
      return state;
  }
};

