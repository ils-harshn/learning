import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth"
import { auth } from "../../firebase"

const requestRegisterUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
            const user = res.user;
            sendEmailVerification(user)
            return user
        })
        .catch((error) => error);
}

export default requestRegisterUser