import { ADD_QUESTION_ERROR, ADD_QUESTION_RESET, ADD_QUESTION_SUCCESS, INITIATE_ADD_QUESTION } from "../types"

export const initiateAddQuestionAction = (title, description, authorUID) => {
    return {
        type: INITIATE_ADD_QUESTION,
        payload: {
            title,
            description,
            authorUID,
        }
    }
}

export const addQuestionSuccessAction = (success) => {
    return {
        type: ADD_QUESTION_SUCCESS,
        payload: {
            success,
        }
    }
}

export const addQuestionErrorAction = (error) => {
    return {
        type: ADD_QUESTION_ERROR,
        payload: {
            error,
        }
    }
}

export const addQuestionReset = () => {
    return {
        type: ADD_QUESTION_RESET,
    }
}