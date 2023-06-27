import { call, put } from "redux-saga/effects";
import { requestEmailToResetPassword } from "../../../../firebase/requests/auth";
import { sendResetPasswordEmailErrorAction, sendResetPasswordEmailSuccessAction } from "../../../actions/authActions/sendResetPasswordEmailActions";

export function* verifySendResetPasswordEmailHandler(action) {
    try {
        yield call(requestEmailToResetPassword, action.payload.email)
        yield put(sendResetPasswordEmailSuccessAction("Sent"))
    } catch (error) {
        yield put(sendResetPasswordEmailErrorAction(error.message))
    }
}