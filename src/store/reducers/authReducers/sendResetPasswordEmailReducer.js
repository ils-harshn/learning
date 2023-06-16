import { INITIATE_SEND_RESET_PASSWORD_EMAIL, SEND_RESET_PASSWORD_EMAIL_ERROR, SEND_RESET_PASSWORD_EMAIL_SUCCESS } from "../../actions/types"

const initailState = {
    loading: false,
    success: null,
    error: null,   
}

const sendResetPasswordEmailReducer = (state=initailState, action) => {
    switch (action.type) {
        case INITIATE_SEND_RESET_PASSWORD_EMAIL:
            return {
                ...initailState,
                loading: true,
            }
        case SEND_RESET_PASSWORD_EMAIL_SUCCESS:
            return {
                ...initailState,
                success: action.payload.success
            }
        case SEND_RESET_PASSWORD_EMAIL_ERROR:
            return {
                ...initailState,
                error: action.payload.error,
            }
        default:
            return state
    }
}

export default sendResetPasswordEmailReducer