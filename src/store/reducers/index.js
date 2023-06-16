import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./authReducers/loginReducer";
import registerReducer from "./authReducers/registerReducer";
import verifyEmailReducer from "./authReducers/verifyEmailReducer";
import sendResetPasswordEmailReducer from "./authReducers/sendResetPasswordEmailReducer";


const combinedReducers = combineReducers({
    loginReducer,
    registerReducer,
    verifyEmailReducer,
    sendResetPasswordEmailReducer,
})



export default combinedReducers