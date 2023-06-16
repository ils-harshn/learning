import { all } from "redux-saga/effects"
import { initiateLoginWatcher } from "./watchers/auth/initiateLoginWatcher"
import { initiateLogoutWatcher } from "./watchers/auth/initiateLogoutWatcher"


export default function* rootSaga() {
    yield all([
        initiateLoginWatcher(),
        initiateLogoutWatcher(),
    ])
  }