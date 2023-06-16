import { INITIATE_SEND_RESET_PASSWORD_EMAIL, SEND_RESET_PASSWORD_EMAIL_ERROR, SEND_RESET_PASSWORD_EMAIL_SUCCESS } from "../types"

export const initiateSendResetPasswordEmail = (email) => {
    return {
        type: INITIATE_SEND_RESET_PASSWORD_EMAIL,
        payload: {
            email,
        }
    }
}

export const sendResetPasswordEmailSuccessAction = (success) => {
    return {
        type: SEND_RESET_PASSWORD_EMAIL_SUCCESS,
        payload: {
            success,
        }
    }
}

export const sendResetPasswordEmailErrorAction = (error) => {
    return {
        type: SEND_RESET_PASSWORD_EMAIL_ERROR,
        payload: {
            error,
        }
    }
}