import {
  GET_CURRENT_USER_SUCCESS,
  AUTH_FAILED,
  LOG_OUT_USER_SUCCESS, GET_CAME_USER_SUCCESS,
} from './index';
const initialState = {
  currentUser: {},
  isSignedIn: false,
  errorMessage: '',
  userName: 'Title',
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
    case GET_CAME_USER_SUCCESS:
      return {
        ...state,
        userName: action.name,
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

