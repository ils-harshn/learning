import { GET_PUBLIC_QUESTIONS_ERROR, GET_PUBLIC_QUESTIONS_SUCCESS, INITIATE_GET_PUBLIC_QUESTIONS } from "../types"

export const initiateGetPublicQuestionsAction = (lastDocRef=false) => {
    return {
        type: INITIATE_GET_PUBLIC_QUESTIONS,
        payload: {
            lastDocRef,
        }
    }
}

export const getPublicQuestionsSuccessAction = (success) => {
    return {
        type: GET_PUBLIC_QUESTIONS_SUCCESS,
        payload: {
            success,
        }
    }
}

export const getPublicQuestionsErrorAction = (error) => {
    return {
        type: GET_PUBLIC_QUESTIONS_ERROR,
        payload: {
            error,
        }
    }
}