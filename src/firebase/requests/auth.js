import { sendPasswordResetEmail, browserSessionPersistence, setPersistence, signInWithEmailAndPassword, browserLocalPersistence, signOut, createUserWithEmailAndPassword, applyActionCode, confirmPasswordReset } from "firebase/auth";
import { auth } from "../index"

// login persistence request
export const setPersistenceAtLogin = (rememberMe) => {
    return setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence)
}

// login request
export const loginWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
}

// logout request
export const requestLogoutUser = () => {
    signOut(auth)
}

// register user request
export const registerWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
}

// verify email request
export const requestVerifyEmail = (oobcode) => {
    return applyActionCode(auth, oobcode)
}

// reset password request
export const requestEmailToResetPassword = (email) => {
    return sendPasswordResetEmail(auth, email)
}

// confirm reset password request
export const requestVerifyResetPassword = (oobcode, newPassword) => {
    return confirmPasswordReset(auth, oobcode, newPassword)
}