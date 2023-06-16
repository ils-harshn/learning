import { INITIATE_VERIFY_EMAIL, VERIFY_EMAIL_ERROR, VERIFY_EMAIL_SUCCESS } from "../types"

export const initiateVerifyEmail = (oobcode) => {
    return {
        type: INITIATE_VERIFY_EMAIL,
        payload: {
            oobcode,
        }
    }
}

export const verifyEmailSuccessAction = (success) => {
    return {
        type: VERIFY_EMAIL_SUCCESS,
        payload: {
            success,
        }
    }
}

export const verifyEmailErrorAction = (error) => {
    return {
        type: VERIFY_EMAIL_ERROR,
        payload: {
            error,
        }
    }
}