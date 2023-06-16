import { INITIATE_LOGIN, INITIATE_LOGOUT, LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT_ERROR, LOGOUT_SUCCESS } from "../types"


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

export const initiateLogoutAction = () => {
    return {
        type: INITIATE_LOGOUT,
    }
}

export const logoutSuccessAction = () => {
    return {
        type: LOGOUT_SUCCESS,
    }
}

export const logoutErrorAction = (error) => {
    return {
        type: LOGOUT_ERROR,
        payload: {
            error,
        }
    }
}