import { call, put } from "redux-saga/effects";
import { requestGetPublicQuestionData } from "../../../../firebase/requests/questions";
import { getPublicQuestionErrorAction, getPublicQuestionSuccessAction } from "../../../actions/questionActions/getPublicQuestionActions";

export function* getPublicQuestionHandler(action) {
    try {
        let data = yield call(requestGetPublicQuestionData, action.payload.id)
        yield put(getPublicQuestionSuccessAction(data))
    } catch (error) {
        yield put(getPublicQuestionErrorAction(error.message))
    }
}