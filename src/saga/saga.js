import {put, takeEvery, all, call, update} from 'redux-saga/effects';
import {
  FETCH_USERS,
  FETCH_TASK_ADD,
  FETCH_TASK_REMOVE,
  FETCH_SEARCHING_USERS,
  FETCH_TASKS,
  GET_CURRENT_USER,
  LOG_OUT_USER,
  LOG_IN_USER,
  FETCH_TASK_UPDATE,
} from '../redux';
import {
  add_users_action_success,
  auth_failed_action,
  changes_saved_action_success,
  delay,
  get_current_user_action_success,
  isLoading_action,
  load_task_action_success,
  log_out_action_success,
  searching_users_action_success,
  task_action_failed,
  users_action_failed,
} from '../redux/actions';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

export function* watchCurrentUser() {
  yield takeEvery(GET_CURRENT_USER, getCurrentUserSaga);
}
export function* watchLogOut() {
  yield takeEvery(LOG_OUT_USER, logOutSaga);
}
export function* watchInOut() {
  yield takeEvery(LOG_IN_USER, logInSaga);
}
export function* watchLoadTask() {
  yield takeEvery(FETCH_TASKS, loadTaskSaga);
}
export function* watchAddTask() {
  yield takeEvery(FETCH_TASK_ADD, addTaskSaga);
}
export function* watchUpdateTask() {
  yield takeEvery(FETCH_TASK_UPDATE, updateTaskSaga);
}
export function* watchRemoveTask() {
  yield takeEvery(FETCH_TASK_REMOVE, removeTaskSaga);
}
export function* watchAddUsers() {
  yield takeEvery(FETCH_USERS, addUsersSaga);
}
export function* watchSearchingUsers() {
  yield takeEvery(FETCH_SEARCHING_USERS, searchingUsersSaga);
}
export function* rootSaga() {
  yield all([
    watchAddTask(),
    watchRemoveTask(),
    watchAddUsers(),
    watchSearchingUsers(),
    watchLoadTask(),
    watchCurrentUser(),
    watchLogOut(),
    watchInOut(),
    watchUpdateTask(),
  ]);
}

export function* logOutSaga() {
  try {
    yield GoogleSignin.signOut();
    yield put(log_out_action_success());
  } catch (error) {
    yield put(auth_failed_action(error.message));
  }
}
export function* logInSaga() {
  try {
    yield GoogleSignin.configure({
      iosClientId:
        '888446947987-3t3rt4rv3qfl4lrh988uhanjkm1cc385.apps.googleusercontent.com',
      webClientId:
        '888446947987-jtaj5c91ah8intosp0l5ohn89ema1fr7.apps.googleusercontent.com',
    });
    const {idToken} = yield GoogleSignin.signIn();
    const googleCredential = yield auth.GoogleAuthProvider.credential(idToken);
    yield auth().signInWithCredential(googleCredential);
    console.log(idToken);
    yield call(getCurrentUserSaga);
  } catch (error) {
    yield put(auth_failed_action(error.message));
  }
}

export function* getCurrentUserSaga() {
  try {
    const currentUser = yield GoogleSignin.getCurrentUser();
    if (!currentUser) {
      return;
    }
    yield put(get_current_user_action_success(currentUser.user));
  } catch (error) {
    yield put(auth_failed_action(error.message));
  }
}

export function* loadTaskSaga(action) {
  try {
    const value = action.value;
    console.log(value);
    yield put(load_task_action_success(value));
  } catch (error) {
    yield put(task_action_failed(error.message));
  }
}
export function* addTaskSaga(action) {
  try {
    const taskInput = action.value;
    const addTask = yield firestore().collection('tasks').add(taskInput);
    yield put(changes_saved_action_success(true));
    yield delay(2000);
    yield put(changes_saved_action_success(false));
  } catch (error) {
    yield put(task_action_failed(error.message));
  }
}
export function* updateTaskSaga(action) {
  try {
    const id = action.id;
    const newTask = action.value;
    console.log(newTask, id);
    const updateTask = yield firestore().collection('tasks').doc(id).update(newTask);
    yield put(changes_saved_action_success(true));
    yield delay(2000);
    yield put(changes_saved_action_success(false));
  } catch (error) {
    yield put(task_action_failed(error.message));
  }
}

export function* removeTaskSaga(action) {
  try {
    const id = action.id;
    const removeTask = yield firestore().collection('tasks').doc(id).delete();
    yield put(changes_saved_action_success(true));
    yield delay(3000);
    yield put(changes_saved_action_success(false));
  } catch (error) {
    yield put(task_action_failed(error.message));
  }
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
