import { INITIATE_VERIFY_RESET_PASSWORD, VERIFY_RESET_PASSWORD_ERROR, VERIFY_RESET_PASSWORD_SUCCESS } from "../types"

export const initiateVerifyResetPassword = (oobcode, newPassword) => {
    return {
        type: INITIATE_VERIFY_RESET_PASSWORD,
        payload: {
            oobcode,
            newPassword,
        }
    }
}

export const verifyResetPasswordSuccessAction = (success) => {
    return {
        type: VERIFY_RESET_PASSWORD_SUCCESS,
        payload: {
            success,
        }
    }
}

export const verifyResetPasswordErrorAction = (error) => {
    return {
        type: VERIFY_RESET_PASSWORD_ERROR,
        payload: {
            error,
        }
    }
}