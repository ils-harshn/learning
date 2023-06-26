import { GET_PUBLIC_QUESTIONS_ERROR, GET_PUBLIC_QUESTIONS_SUCCESS, INITIATE_GET_NEXT_PUBLIC_QUESTIONS, INITIATE_GET_PUBLIC_QUESTIONS } from "../../actions/types"

const initailState = {
    loading: true,
    success: [],
    error: null,  
    lastDocRef: null,
    nextDataAvialable: true,
}

const getPublicQuestionsReducer = (state=initailState, action) => {
    switch (action.type) {
        case INITIATE_GET_PUBLIC_QUESTIONS:
            return {
                ...initailState,
                loading: true,
            }

        case INITIATE_GET_NEXT_PUBLIC_QUESTIONS:
            return {
                ...state,
                loading: true,
            }
        case GET_PUBLIC_QUESTIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: [
                    ...state.success,
                    ...action.payload.success.data
                ],
                lastDocRef: action.payload.success.lastDocRef,
                nextDataAvialable: action.payload.success.data.length && true,
            }
        case GET_PUBLIC_QUESTIONS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                nextDataAvialable: false,
            }
        default:
            return initailState
    }
}

export default getPublicQuestionsReducer