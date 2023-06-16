import { takeLatest } from 'redux-saga/effects'
import { INITIATE_REGISTRATION } from '../../../actions/types'
import { registerHandler } from '../../handlers/auth/registerHandler'


export function* initiateRegisterWatcher()  {
    yield takeLatest(INITIATE_REGISTRATION, registerHandler)
}