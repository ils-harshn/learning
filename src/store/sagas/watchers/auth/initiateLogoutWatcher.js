import { takeLatest } from 'redux-saga/effects'
import { INITIATE_LOGOUT } from '../../../actions/types'
import { logoutHandler } from '../../handlers/auth/logoutHandler'

export function* initiateLogoutWatcher()  {
    yield takeLatest(INITIATE_LOGOUT, logoutHandler)
}