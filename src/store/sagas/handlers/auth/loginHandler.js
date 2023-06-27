import { call, put } from "redux-saga/effects";
import { loginWithEmailAndPassword, setPersistenceAtLogin } from "../../../../firebase/requests/auth";
import { loginErrorAction, loginSuccessAction } from "../../../actions/authActions/loginActions";

export function* loginHandler(action) {
    try {
        yield call(setPersistenceAtLogin, action.payload.rememberMe)
        let data = yield call(loginWithEmailAndPassword, action.payload.email, action.payload.password)
        yield put(loginSuccessAction(data.user))
    } catch (error) {
        yield put(loginErrorAction(error.message))
    }
}