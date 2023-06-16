import { takeLatest } from 'redux-saga/effects'
import { INITIATE_LOGIN } from '../../../actions/types'
import { loginHandler } from '../../handlers/auth/loginHandler'

export function* initiateLoginWatcher()  {
    yield takeLatest(INITIATE_LOGIN, loginHandler)
}