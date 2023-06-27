import { call, put } from "redux-saga/effects";
import { requestAddQuestion } from "../../../../firebase/requests/questions";
import { addQuestionErrorAction, addQuestionSuccessAction } from "../../../actions/questionActions/addQuestionActions";

export function* addQuestionHandler(action) {
    try {
        yield call(requestAddQuestion, action.payload.title, action.payload.description, action.payload.authorUID)
        yield put(addQuestionSuccessAction("Added"))
    } catch (error) {
        yield put(addQuestionErrorAction(error.message))
    }
}