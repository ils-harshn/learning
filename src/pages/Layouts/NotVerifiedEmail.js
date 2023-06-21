import { sendEmailVerification } from "firebase/auth"
import { useState } from "react"
import { Link } from "react-router-dom"
import AuthNavbar from "../../components/AuthNavbar"
import { FullScreenInfo, InfoContainer, PrimaryButton, SuccessMessage } from "../../styles/notifiers/info.styles"
import { ButtonLoaderIcon, FormGroupError } from "../Login/styles/loginForm.styles"

const NotVerifiedEmail = ({ user }) => {
    const [sending, setSending] = useState(false)
    const [emailSent, setEmailSent] = useState(false)
    const [error, setError] = useState("")

    const resendEmail = async () => {
        setSending(true)
        setEmailSent(false)
        setError("")
        await sendEmailVerification(user)
            .then(() => {
                setEmailSent(true)
                setError("")
            })
            .catch((error) => setError(error.message))
        setSending(false)
    }

    return (<>
        <AuthNavbar />
        <FullScreenInfo>
            <InfoContainer>
                <h3>You email is not verified yet</h3>
                <p>{user.email}, check your <Link to="https://mail.google.com/" target="_blank" rel="noreferrer">inbox</Link> and click the link for verification.</p>
                <p>Please reload this page once you verify the email</p>
                <h4>Did not received mail?</h4>
                <PrimaryButton disabled={sending} onClick={resendEmail}>{sending ? <ButtonLoaderIcon /> : "Resend Email"}</PrimaryButton>
                {emailSent && <SuccessMessage>Email has been sent</SuccessMessage>}
                {error && <FormGroupError>{error}</FormGroupError>}
            </InfoContainer>
        </FullScreenInfo>
    </>
    )
}

export default NotVerifiedEmail