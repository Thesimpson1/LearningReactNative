import {
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILED,
  IS_LOADING, IS_SHOW_CHANGING_MESSAGE,
} from './index';
const initialState = {
  task: [],
  errorMessage: '',
  isShowChangingMessage: false,
  changingMessage: '',
};

export const Reducer = (state = initialState, action) => {

  switch (action.type) {
    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        task: action.value,
      };
    case FETCH_TASKS_FAILED:
      return {
        ...state,
        errorMessage: action.error,
      };
    case IS_SHOW_CHANGING_MESSAGE:
      return {
        ...state,
        isChangesSaved: action.boolean,
        changingMessage: action.message,
      };
    default:
      return state;
  }
};
