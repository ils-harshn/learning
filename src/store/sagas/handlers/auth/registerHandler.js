import { call, put } from "redux-saga/effects";
import { registerWithEmailAndPassword } from "../../../../firebase/requests/registerUser";
import { registerErrorAction, registerSuccessAction } from "../../../actions/authActions/registerActions";
import { setPersistenceAtLogin } from "../../../../firebase/requests/loginUser";
import { sendEmailVerification } from "firebase/auth";

export function* registerHandler(action) {
    try {
        yield call(setPersistenceAtLogin, false)
        let data = yield call(registerWithEmailAndPassword, action.payload.email, action.payload.password)
        yield sendEmailVerification(data.user)
        yield put(registerSuccessAction(data.user))
    } catch (error) {
        yield put(registerErrorAction(error.message))
    }
}