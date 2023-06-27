import { call, put } from "redux-saga/effects";
import { requestVerifyEmail } from "../../../../firebase/requests/auth";
import { verifyEmailErrorAction, verifyEmailSuccessAction } from "../../../actions/authActions/verifyEmailActions";

export function* verifyEmailHandler(action) {
    try {
        yield call(requestVerifyEmail, action.payload.oobcode)
        yield put(verifyEmailSuccessAction("Verified"))
    } catch (error) {
        yield put(verifyEmailErrorAction(error.message))
    }
}