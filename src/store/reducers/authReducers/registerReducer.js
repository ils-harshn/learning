import { INITIATE_REGISTRATION, REGISTRATION_ERROR, REGISTRATION_SUCCESS } from "../../actions/types"

const initailState = {
    loading: false,
    success: null,
    error: null,   
}

const registerReducer = (state=initailState, action) => {
    switch (action.type) {
        case INITIATE_REGISTRATION:
            return {
                ...initailState,
                loading: true,
            }
        case REGISTRATION_SUCCESS:
            return {
                ...initailState,
                success: action.payload.success
            }
        case REGISTRATION_ERROR:
            return {
                ...initailState,
                error: action.payload.error,
            }
        default:
            return state
    }
}

export default registerReducer