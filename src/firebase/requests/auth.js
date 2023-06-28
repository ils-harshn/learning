import { sendPasswordResetEmail, browserSessionPersistence, setPersistence, signInWithEmailAndPassword, browserLocalPersistence, signOut, createUserWithEmailAndPassword, applyActionCode, confirmPasswordReset } from "firebase/auth";
import { auth, db } from "../index"
import { doc, setDoc } from "firebase/firestore";

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
export const registerWithEmailAndPassword = async (email, password, fullName) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    await setDoc(doc(db, "users", userCredential.user.uid), {
        points: 0,
        fullName: fullName,
    })
    return userCredential
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