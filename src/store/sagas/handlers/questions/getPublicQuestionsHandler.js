import { call, put } from "redux-saga/effects";
import requestGetPublicQuestions from "../../../../firebase/requests/Questions/getQuestions";
import { getPublicQuestionsErrorAction, getPublicQuestionsSuccessAction } from "../../../actions/questionActions/getPublicQuestionsActions";

export function* getPublicQuestionsHandler(action) {
    try {
        let data = yield call(requestGetPublicQuestions, action.payload.lastDocRef)
        yield put(getPublicQuestionsSuccessAction(data))
    } catch (error) {
        yield put(getPublicQuestionsErrorAction(error.message))
    }
}