import {put, takeEvery} from "redux-saga/effects";
import {FETCH_SEARCHING_USERS, FETCH_USERS} from "../redux";
import {
  add_users_action_success,
  isLoading_action,
  searching_users_action_success,
  users_action_failed
} from "../redux/actions";
import axios from "axios";

export function* watchAddUsers() {
  yield takeEvery(FETCH_USERS, addUsersSaga);
}
export function* watchSearchingUsers() {
  yield takeEvery(FETCH_SEARCHING_USERS, searchingUsersSaga);
}
export function* addUsersSaga() {
  try {
    yield put(isLoading_action(true));
    const response = yield axios.get(
        'https://api.github.com/search/users?q=user&per_page=10',
    );
    yield put(add_users_action_success(response.data.items));
    yield put(isLoading_action(false));
  } catch (error) {
    yield put(users_action_failed(error.message));
    yield put(isLoading_action(false));
  }
}
export function* searchingUsersSaga(action) {
  try {
    yield put(isLoading_action(true));
    const name = action.name;
    const response = yield axios.get(
        `https://api.github.com/search/users?q=user:${name}`,
    );
    yield put(searching_users_action_success(response.data.items));
    yield put(users_action_failed(''));
    yield put(isLoading_action(false));
  } catch (error) {
    yield put(users_action_failed(error.message));
    yield put(isLoading_action(false));
  }
}

