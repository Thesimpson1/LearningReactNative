import {call, put, takeEvery} from "redux-saga/effects";
import {FETCH_TASK_ADD, FETCH_TASK_REMOVE, FETCH_TASK_UPDATE, FETCH_TASKS} from "../redux";
import {
  isShowChangingMessage,
  load_task_action_success,
  task_action_failed
} from "../redux/actions";
import firestore from "@react-native-firebase/firestore";

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


export function* loadTaskSaga(action) {
  try {
    const value = action.value;
    yield put(load_task_action_success(value));
  } catch (error) {
    yield put(task_action_failed(error.message));
  }
}
export function* addTaskSaga(action) {
  try {
    yield firestore().collection('tasks').add(action.value);

    yield call(()=> task_action_success('Task added'));
  } catch (error) {
    yield put(task_action_failed(error.message));
  }
}
export function* updateTaskSaga(action) {
  try {
    yield firestore().collection('tasks').doc(action.id).update(action.value);
    yield call(()=> task_action_success('Task updated'));
  } catch (error) {
    yield put(task_action_failed(error.message));
  }
}

export function* removeTaskSaga(action) {
  try {
    yield firestore().collection('tasks').doc(action.id).delete();
    yield call(()=> task_action_success('Task deleted'));
  } catch (error) {
    yield put(task_action_failed(error.message));
  }
}
export function* task_action_success(message) {
  yield put(isShowChangingMessage(true, message));
  yield new Promise(res => setTimeout(res, 2000));
  yield put(isShowChangingMessage(false, message));
};
