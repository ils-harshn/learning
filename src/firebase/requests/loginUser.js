import { browserSessionPersistence, setPersistence, signInWithEmailAndPassword, browserLocalPersistence } from "firebase/auth";
import { auth } from "../index";

export const requestLoginUser = (email, password, rememberMe=false) => {
    return setPersistence(auth, rememberMe ? browserLocalPersistence: browserSessionPersistence)
        .then(() => {
            return signInWithEmailAndPassword(auth, email, password)
                .then((res) => {
                    const user = res.user;
                    return user
                })
                .catch((error) => error);
        }).catch((error) => {
            return error
        })
}

export default requestLoginUser