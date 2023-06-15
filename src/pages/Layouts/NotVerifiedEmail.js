import { sendEmailVerification } from "firebase/auth"
import { useState } from "react"
import { Link } from "react-router-dom"

const NotVerifiedEmail = ({ user }) => {
    const [sending, setSending] = useState(false)
    const [emailSent, setEmailSent] = useState(false)
    const [error, setError] = useState("")

    const resendEmail = async () => {
        setSending(true)
        setEmailSent(false)
        await sendEmailVerification(user)
            .then(() => setEmailSent(true))
            .catch((error) => setError(error.message))
        setSending(false)
    }

    return (
        <div>
            <h3>You email is not verified yet</h3>
            <p>{user.email}, check your <Link to="https://mail.google.com/" target="_blank" rel="noreferrer">indox</Link> and click the link for verification.</p>
            <p>Please reload this page once you verify the email</p>
            <h4>Did not received mail</h4>
            <button disabled={sending || emailSent} onClick={resendEmail}>Resend Email</button>
            {emailSent && <p>Email has been sent</p>}
            {error && <p>{error}</p>}
        </div>
    )
}

export default NotVerifiedEmail