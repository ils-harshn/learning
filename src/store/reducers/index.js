import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./authReducers/loginReducer";
import registerReducer from "./authReducers/registerReducer";
import verifyEmailReducer from "./authReducers/verifyEmailReducer";
import sendResetPasswordEmailReducer from "./authReducers/sendResetPasswordEmailReducer";
import verifyResetPasswordReducer from "./authReducers/verifyResetPasswordReducer";


const combinedReducers = combineReducers({
    loginReducer,
    registerReducer,
    verifyEmailReducer,
    sendResetPasswordEmailReducer,
    verifyResetPasswordReducer,
})



export default combinedReducers