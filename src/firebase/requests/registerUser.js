import { createUserWithEmailAndPassword, sendEmailVerification, browserSessionPersistence, setPersistence } from "firebase/auth"
import { auth } from "../../firebase"

export const requestRegisterUser = (email, password) => {
    return setPersistence(auth, browserSessionPersistence)
        .then(() => {
            return createUserWithEmailAndPassword(auth, email, password)
                .then((res) => {
                    const user = res.user;
                    sendEmailVerification(user)
                    return user
                })
                .catch((error) => error);
        }).catch((error) => {
            return error
        })
}