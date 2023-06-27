import { GET_PUBLIC_QUESTION_ERROR, GET_PUBLIC_QUESTION_SUCCESS, INITIATE_GET_PUBLIC_QUESTION } from "../types"

export const initiateGetPublicQuestionAction = (id) => {
    return {
        type: INITIATE_GET_PUBLIC_QUESTION,
        payload: {
            id,
        }
    }
}

export const getPublicQuestionSuccessAction = (success) => {
    return {
        type: GET_PUBLIC_QUESTION_SUCCESS,
        payload: {
            success,
        }
    }
}

export const getPublicQuestionErrorAction = (error) => {
    return {
        type: GET_PUBLIC_QUESTION_ERROR,
        payload: {
            error,
        }
    }
}