import { takeLatest } from 'redux-saga/effects'
import { INITIATE_SEND_RESET_PASSWORD_EMAIL } from '../../../actions/types'
import { verifySendResetPasswordEmailHandler } from '../../handlers/auth/verifySendResetPasswordEmailHandler'

export function* initiateSendResetPasswordEmailWatcher()  {
    yield takeLatest(INITIATE_SEND_RESET_PASSWORD_EMAIL, verifySendResetPasswordEmailHandler)
}