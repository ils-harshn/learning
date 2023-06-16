import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "../index"

const requestEmailToResetPassword = (email) => {
    return sendPasswordResetEmail(auth, email)
}

export default requestEmailToResetPassword