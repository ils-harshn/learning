import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./authReducers/loginReducer";


const combinedReducers = combineReducers({
    loginReducer,
})

export default combinedReducers