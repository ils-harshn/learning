import { browserSessionPersistence, setPersistence, signInWithEmailAndPassword, browserLocalPersistence } from "firebase/auth";
import { auth } from "../index";

export const setPersistenceAtLogin = (rememberMe) => {
    return setPersistence(auth, rememberMe ? browserLocalPersistence: browserSessionPersistence)
}

export const loginWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
}