import { call, put } from "redux-saga/effects";
import requestLogoutUser from "../../../../firebase/requests/logoutUser";
import { logoutErrorAction, logoutSuccessAction } from "../../../actions/authActions/loginActions";

export function* logoutHandler() {
    try {
        yield call(requestLogoutUser)
        yield put(logoutSuccessAction())
    } catch (error) {
        yield put(logoutErrorAction(error.message))
    }
}