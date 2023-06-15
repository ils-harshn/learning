import { Link } from "react-router-dom"

const SuccessfullRegistration = ({ user }) => {
    return (
        <>
            <h3>Registration SuccessFull</h3>
            <p>A email have been sent to you for email verification at {user.email}</p>
            <Link to="https://mail.google.com/" target="_blank" rel="noreferrer">Open your indox</Link>
            <p>You are considered to be logged in also</p>
            <Link to="/">Go to home page</Link>
        </>
    )
}

export default SuccessfullRegistration