import {
  FETCH_TASK_ADD,
  FETCH_TASK_REMOVE,
  FETCH_USERS,
  IS_LOADING,
  FETCH_SEARCHING_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILED,
  FETCH_SEARCHING_USERS_SUCCESS,
  FETCH_TASKS,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILED,
  AUTH_FAILED,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER,
  LOG_OUT_USER,
  LOG_OUT_USER_SUCCESS,
  LOG_IN_USER, FETCH_TASK_UPDATE, IS_SHOW_CHANGING_MESSAGE,
} from './index';
export const isLoading_action = isLoading => ({type: IS_LOADING, isLoading});

export const load_task_action = value => ({type: FETCH_TASKS, value});
export const load_task_action_success = value => ({type: FETCH_TASKS_SUCCESS, value});
export const task_action_failed = error => ({type: FETCH_TASKS_FAILED, error});

export const add_task_action = value => ({type: FETCH_TASK_ADD, value});
export const update_task_action = (id, value) => ({type: FETCH_TASK_UPDATE, id, value});
export const remove_task_action = id => ({type: FETCH_TASK_REMOVE, id});

export const add_users_action = () => ({type: FETCH_USERS});
export const add_users_action_success = response => ({type: FETCH_USERS_SUCCESS, response});
export const users_action_failed = error => ({type: FETCH_USERS_FAILED, error});

export const searching_users_action = name => ({type: FETCH_SEARCHING_USERS, name});
export const searching_users_action_success = response => ({type: FETCH_SEARCHING_USERS_SUCCESS, response});

export const get_user_action = () => ({type: GET_CURRENT_USER});
export const log_out_action = () => ({type: LOG_OUT_USER});
export const log_out_action_success = () => ({type: LOG_OUT_USER_SUCCESS});
export const log_in_action = () => ({type: LOG_IN_USER});

export const get_current_user_action_success = currentUser => ({type: GET_CURRENT_USER_SUCCESS, currentUser});
export const auth_failed_action = error => ({type: AUTH_FAILED, error});


export const isShowChangingMessage = (boolean,message) => ({type: IS_SHOW_CHANGING_MESSAGE, boolean, message});

