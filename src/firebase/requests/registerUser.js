import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase"

export const requestRegisterUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
            const user = res.user;
            sendEmailVerification(user)
            return user
        })
        .catch((error) => error);
}

export const requestLoginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
            const user = res.user;
            return user
        })
        .catch((error) => error);
}