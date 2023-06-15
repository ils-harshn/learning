import { Link } from "react-router-dom"

const NotSignedIn = () => {
    return (
        <>
            <p>You are signed out</p>
            <Link to="/accounts/login">Login</Link>
            <p>Do not have accounts or need a another account</p>
            <Link to="/accounts/register">Register</Link>
        </>
    )
}

export default NotSignedIn