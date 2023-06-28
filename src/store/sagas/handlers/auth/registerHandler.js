import { call, put } from "redux-saga/effects";
import { registerWithEmailAndPassword, setPersistenceAtLogin } from "../../../../firebase/requests/auth";
import { registerErrorAction, registerSuccessAction } from "../../../actions/authActions/registerActions";
import { sendEmailVerification } from "firebase/auth";

export function* registerHandler(action) {
    try {
        yield call(setPersistenceAtLogin, false)
        let data = yield call(registerWithEmailAndPassword, action.payload.email, action.payload.password, action.payload.fullName)
        yield sendEmailVerification(data.user)
        yield put(registerSuccessAction(data.user))
    } catch (error) {
        yield put(registerErrorAction(error.message))
    }
}