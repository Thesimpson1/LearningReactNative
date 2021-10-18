import {applyMiddleware, combineReducers, createStore} from 'redux';
import {Reducer} from './ReducerToDo.js';
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from '../saga/saga';
import {composeWithDevTools} from 'redux-devtools-extension';
import {ReducerGitUsers} from './ReducerGitUsers';
import {ReducerAuth} from './ReducerAuth';

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
sagaMiddleware.run(rootSaga);
