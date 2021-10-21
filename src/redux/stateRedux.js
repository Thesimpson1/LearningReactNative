import {applyMiddleware, combineReducers, createStore} from 'redux';
import {Reducer} from './ReducerToDo.js';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';
import {ReducerGitUsers} from './ReducerGitUsers';
import {ReducerAuth} from './ReducerAuth';
import {all} from "redux-saga/effects";
import {watchAddTask,  watchLoadTask,  watchRemoveTask, watchUpdateTask} from "../saga/TaskSaga";
import {watchAddUsers, watchSearchingUsers} from "../saga/UsersSaga";
import {watchCameUser, watchCurrentUser, watchLogIn, watchLogOut} from "../saga/AuthSaga";

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  users: ReducerGitUsers,
  toDo: Reducer,
  auth: ReducerAuth,
});
export const state = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware)),
);
export function* rootSaga() {
  yield all([
    watchAddTask(),
    watchRemoveTask(),
    watchAddUsers(),
    watchSearchingUsers(),
    watchLoadTask(),
    watchCurrentUser(),
    watchLogOut(),
    watchLogIn(),
    watchUpdateTask(),
    watchCameUser(),
  ]);
}

sagaMiddleware.run(rootSaga);
