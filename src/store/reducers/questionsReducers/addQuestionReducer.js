import { ADD_QUESTION_ERROR, ADD_QUESTION_SUCCESS, INITIATE_ADD_QUESTION, } from "../../actions/types"

const initailState = {
    loading: false,
    success: null,
    error: null,   
}

const addQuestionReducer = (state=initailState, action) => {
    switch (action.type) {
        case INITIATE_ADD_QUESTION:
            return {
                ...initailState,
                loading: true,
            }
        case ADD_QUESTION_SUCCESS:
            return {
                ...initailState,
                success: action.payload.success
            }
        case ADD_QUESTION_ERROR:
            return {
                ...initailState,
                error: action.payload.error,
            }
        default:
            return initailState
    }
}

export default addQuestionReducer