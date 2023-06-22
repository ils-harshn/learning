import { all } from "redux-saga/effects"
import { initiateLoginWatcher } from "./watchers/auth/initiateLoginWatcher"
import { initiateLogoutWatcher } from "./watchers/auth/initiateLogoutWatcher"
import { initiateRegisterWatcher } from "./watchers/auth/initiateRegisterWatcher"
import { initiateVerifyEmailWatcher } from "./watchers/auth/initiateVerifyEmailWatcher"
import { initiateSendResetPasswordEmailWatcher } from "./watchers/auth/initiateSendResetPasswordEmailWatcher"
import { initiateVerifyResetPasswordWatcher } from "./watchers/auth/initiateVerifyResetPasswordWatcher"
import { initiateAddQuestionWatcher } from "./watchers/questions/initiateAddQuestionWatcher"


export default function* rootSaga() {
    yield all([
        initiateLoginWatcher(),
        initiateLogoutWatcher(),
        initiateRegisterWatcher(),
        initiateVerifyEmailWatcher(),
        initiateSendResetPasswordEmailWatcher(),
        initiateVerifyResetPasswordWatcher(),
        initiateAddQuestionWatcher(),
    ])
}
