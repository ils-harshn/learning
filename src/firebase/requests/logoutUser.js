import { signOut } from "firebase/auth"
import { auth } from "../../firebase"

const requestLogoutUser = () => {
    signOut(auth)
}

export default requestLogoutUser