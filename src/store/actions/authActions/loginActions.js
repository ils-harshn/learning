import { INITIATE_LOGIN, LOGIN_ERROR, LOGIN_SUCCESS } from "../types"


export const initiateLoginAction = (email, password, rememberMe) => {
    return {
        type: INITIATE_LOGIN,
        payload: {
            email,
            password,
            rememberMe,
        }
    }
}

export const loginSuccessAction = (success) => {
    return {
        type: LOGIN_SUCCESS,
        payload: {
            success,
        }
    }
}

export const loginErrorAction = (error) => {
    return {
        type: LOGIN_ERROR,
        payload: {
            error,
        }
    }
}