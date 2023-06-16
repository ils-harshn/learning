import { all } from "redux-saga/effects"
import { initiateLoginWatcher } from "./watchers/auth/initiateLoginWatcher"


export default function* rootSaga() {
    yield all([
        initiateLoginWatcher(),
    ])
  }