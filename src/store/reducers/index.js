import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./authReducers/loginReducer";
import registerReducer from "./authReducers/registerReducer";


const combinedReducers = combineReducers({
    loginReducer,
    registerReducer,    
})


export default combinedReducers