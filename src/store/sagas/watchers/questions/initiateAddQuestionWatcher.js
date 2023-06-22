import { takeLatest } from 'redux-saga/effects'
import { INITIATE_ADD_QUESTION } from '../../../actions/types'
import { addQuestionHandler } from '../../handlers/questions/addQuestionHandler'

export function* initiateAddQuestionWatcher()  {
    yield takeLatest(INITIATE_ADD_QUESTION, addQuestionHandler)
}