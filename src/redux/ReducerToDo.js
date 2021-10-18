import {
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILED,
  CHANGES_SAVED_SUCCESS,
} from './index';
const initialState = {
  task: [],
  errorMessage: '',
  isChangesSaved: false,
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
    case CHANGES_SAVED_SUCCESS:
      return {
        ...state,
        isChangesSaved: action.boolean,
      };

    default:
      return state;
  }
};
