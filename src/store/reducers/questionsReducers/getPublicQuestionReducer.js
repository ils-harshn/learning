import { GET_PUBLIC_QUESTION_ERROR, GET_PUBLIC_QUESTION_SUCCESS, INITIATE_GET_PUBLIC_QUESTION } from "../../actions/types"

const initailState = {
    loading: true,
    success: null,
    error: null,
}

const getPublicQuestionReducer = (state=initailState, action) => {
    switch (action.type) {
        case INITIATE_GET_PUBLIC_QUESTION:
            return {
                ...initailState,
                loading: true,
            }
        case GET_PUBLIC_QUESTION_SUCCESS:
            return {
                ...initailState,
                loading: false,
                success: action.payload.success,
            }
        case GET_PUBLIC_QUESTION_ERROR:
            return {
                ...initailState,
                loading: false,
                error: action.payload.error,
            }
        default:
            return state
    }
}

export default getPublicQuestionReducer