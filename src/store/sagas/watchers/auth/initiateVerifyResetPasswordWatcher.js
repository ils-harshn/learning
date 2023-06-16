import { takeLatest } from 'redux-saga/effects'
import { INITIATE_VERIFY_RESET_PASSWORD } from '../../../actions/types'
import { verifyResetPasswordHandler } from '../../handlers/auth/verifyResetPasswordHandler'

export function* initiateVerifyResetPasswordWatcher()  {
    yield takeLatest(INITIATE_VERIFY_RESET_PASSWORD, verifyResetPasswordHandler)
}