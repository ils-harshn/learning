import { takeLatest } from 'redux-saga/effects'
import { INITIATE_VERIFY_EMAIL } from '../../../actions/types'
import { verifyEmailHandler } from '../../handlers/auth/verifyEmailHandler'

export function* initiateVerifyEmailWatcher()  {
    yield takeLatest(INITIATE_VERIFY_EMAIL, verifyEmailHandler)
}