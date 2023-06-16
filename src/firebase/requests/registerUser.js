import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase"

export const registerWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
}