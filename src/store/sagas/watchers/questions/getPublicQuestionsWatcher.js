import { takeLatest } from 'redux-saga/effects'
import { INITIATE_GET_PUBLIC_QUESTIONS } from '../../../actions/types'
import { getPublicQuestionsHandler } from '../../handlers/questions/getPublicQuestionsHandler'

export function* getPublicQuestionsWatcher()  {
    yield takeLatest(INITIATE_GET_PUBLIC_QUESTIONS, getPublicQuestionsHandler)
}