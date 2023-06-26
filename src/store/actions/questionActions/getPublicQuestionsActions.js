import { GET_PUBLIC_QUESTIONS_ERROR, GET_PUBLIC_QUESTIONS_SUCCESS, INITIATE_GET_NEXT_PUBLIC_QUESTIONS, INITIATE_GET_PUBLIC_QUESTIONS } from "../types"

export const initiateGetPublicQuestionsAction = () => {
    return {
        type: INITIATE_GET_PUBLIC_QUESTIONS,
        payload: {
            lastDocRef: false,
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

export const initiateGetNextPublicQuestionsAction = (lastDocRef=false) => {
    return {
        type: INITIATE_GET_NEXT_PUBLIC_QUESTIONS,
        payload: {
            lastDocRef,
        }
    }
}