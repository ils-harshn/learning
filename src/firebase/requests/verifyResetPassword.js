import { confirmPasswordReset } from "firebase/auth";
import { auth } from "../index"

const requestVerifyResetPassword = (oobcode, newPassword) => {
    return confirmPasswordReset(auth, oobcode, newPassword)
}

export default requestVerifyResetPassword