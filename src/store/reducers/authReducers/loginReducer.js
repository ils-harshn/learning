import { INITIATE_LOGIN, LOGIN_ERROR, LOGIN_SUCCESS } from "../../actions/types"

const initailState = {
    loading: false,
    success: null,
    error: null,   
}

const loginReducer = (state=initailState, action) => {
    switch (action.type) {
        case INITIATE_LOGIN:
            return {
                ...initailState,
                loading: true,
            }
        case LOGIN_SUCCESS:
            return {
                ...initailState,
                success: action.payload.success
            }
        case LOGIN_ERROR:
            return {
                ...initailState,
                error: action.payload.error,
            }
        default:
            return state
    }
}

export default loginReducer