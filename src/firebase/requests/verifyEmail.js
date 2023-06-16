import { applyActionCode } from "firebase/auth"
import { auth } from "../index"

const requestVerifyEmail = (oobcode) => {
    return applyActionCode(auth, oobcode)
}

export default requestVerifyEmail