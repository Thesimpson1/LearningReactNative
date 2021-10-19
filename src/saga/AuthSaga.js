import {call, put, takeEvery} from "redux-saga/effects";
import {GET_CURRENT_USER, LOG_IN_USER, LOG_OUT_USER} from "../redux";
import {GoogleSignin} from "@react-native-google-signin/google-signin";
import {auth_failed_action, get_current_user_action_success, log_out_action_success} from "../redux/actions";
import auth from "@react-native-firebase/auth";


export function* watchLogOut() {
    yield takeEvery(LOG_OUT_USER, logOutSaga);
}
export function* watchLogIn() {
    yield takeEvery(LOG_IN_USER, logInSaga);
}
export function* watchCurrentUser() {
    yield takeEvery(GET_CURRENT_USER, getCurrentUserSaga);
}

export function* logOutSaga() {
    try {
        yield GoogleSignin.signOut();
        yield put(log_out_action_success());
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
        yield call(getCurrentUserSaga);
    } catch (error) {
        yield put(auth_failed_action(error.message));
    }
}

