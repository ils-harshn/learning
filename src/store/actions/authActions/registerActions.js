import { INITIATE_REGISTRATION, REGISTRATION_ERROR, REGISTRATION_SUCCESS } from "../types"

export const initiateRegisterAction = (email, password) => {
    return {
        type: INITIATE_REGISTRATION,
        payload: {
            email,
            password,
        }
    }
}

export const registerSuccessAction = (success) => {
    return {
        type: REGISTRATION_SUCCESS,
        payload: {
            success,
        }
    }
}

export const registerErrorAction = (error) => {
    return {
        type: REGISTRATION_ERROR,
        payload: {
            error,
        }
    }
}