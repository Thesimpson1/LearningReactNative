import {
  FETCH_USERS_SUCCESS,
  IS_LOADING,
  FETCH_SEARCHING_USERS_SUCCESS,
  FETCH_USERS_FAILED,
} from './index';

const initialState = {
  total_count: 0,
  users: [],
  isLoading: false,
  errorMessage: '',
};

export const ReducerGitUsers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.response,
        total_count: action.response.total_count,
      };
    case FETCH_SEARCHING_USERS_SUCCESS:
      return {...state, users: action.response};
    case FETCH_USERS_FAILED:
      return {
        ...state,
        errorMessage: action.error,
      };
    case IS_LOADING:
      return {...state, isLoading: action.isLoading};
    default:
      return state;
  }
};
