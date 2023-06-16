import { INITIATE_VERIFY_EMAIL, VERIFY_EMAIL_ERROR, VERIFY_EMAIL_SUCCESS } from "../../actions/types"

const initailState = {
    loading: false,
    success: null,
    error: null,   
}

const verifyEmailReducer = (state=initailState, action) => {
    switch (action.type) {
        case INITIATE_VERIFY_EMAIL:
            return {
                ...initailState,
                loading: true,
            }
        case VERIFY_EMAIL_SUCCESS:
            return {
                ...initailState,
                success: action.payload.success
            }
        case VERIFY_EMAIL_ERROR:
            return {
                ...initailState,
                error: action.payload.error,
            }
        default:
            return state
    }
}

export default verifyEmailReducer