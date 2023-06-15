import { signOut } from "firebase/auth"
import { Link } from "react-router-dom"
import { auth } from "../../firebase"
import { useState } from "react"

const AlreadyLoggedIn = ({ user }) => {
    const [loading, setLoading] = useState(false)

    const logOutUser = async () => {
        setLoading(true)
        await signOut(auth)
        setLoading(false)
    }

    return (
        <div>
            <h3>You already logged in as { user.email }</h3>
            <Link to={"/"}>Go to home page</Link>
            <button onClick={logOutUser} disabled={loading}>
                {loading ? "Signing Out": "Sign Out"}
            </button>
        </div>
    )
}

export default AlreadyLoggedIn