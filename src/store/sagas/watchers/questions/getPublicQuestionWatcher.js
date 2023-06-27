import { takeLatest } from 'redux-saga/effects'
import { INITIATE_GET_PUBLIC_QUESTION } from '../../../actions/types'
import { getPublicQuestionHandler } from '../../handlers/questions/getPublicQuestionHandler'

export function* getPublicQuestionWatcher()  {
    yield takeLatest(INITIATE_GET_PUBLIC_QUESTION, getPublicQuestionHandler)
}