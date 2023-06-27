import { call, put } from "redux-saga/effects";
import { requestVerifyResetPassword } from "../../../../firebase/requests/auth";
import { verifyResetPasswordErrorAction, verifyResetPasswordSuccessAction } from "../../../actions/authActions/verifyResetPasswordActions";
import { initiateLogoutAction } from "../../../actions/authActions/loginActions";

export function* verifyResetPasswordHandler(action) {
    try {
        yield call(requestVerifyResetPassword, action.payload.oobcode, action.payload.newPassword)
        yield put(initiateLogoutAction())
        yield put(verifyResetPasswordSuccessAction("Verified"))
    } catch (error) {
        yield put(verifyResetPasswordErrorAction(error.message))
    }
}