import { INITIATE_VERIFY_RESET_PASSWORD, VERIFY_RESET_PASSWORD_ERROR, VERIFY_RESET_PASSWORD_SUCCESS } from "../../actions/types"

const initailState = {
    loading: false,
    success: null,
    error: null,   
}

const verifyResetPasswordReducer = (state=initailState, action) => {
    switch (action.type) {
        case INITIATE_VERIFY_RESET_PASSWORD:
            return {
                ...initailState,
                loading: true,
            }
        case VERIFY_RESET_PASSWORD_SUCCESS:
            return {
                ...initailState,
                success: action.payload.success
            }
        case VERIFY_RESET_PASSWORD_ERROR:
            return {
                ...initailState,
                error: action.payload.error,
            }
        default:
            return state
    }
}

export default verifyResetPasswordReducer