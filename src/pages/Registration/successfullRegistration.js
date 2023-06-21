import { Link } from "react-router-dom"
import { FullScreenInfo, InfoContainer } from "../../styles/notifiers/info.styles"

const SuccessfullRegistration = ({ user }) => {
    return (
        <FullScreenInfo>
            <InfoContainer>
                <h3>Registration SuccessFull</h3>
                <p>A email have been sent to you for email verification at {user.email}</p>
                <Link to="https://mail.google.com/" target="_blank" rel="noreferrer">Open your indox</Link>
                <p>You are considered to be logged in also</p>
                <Link to="/">Go to home page</Link>
            </InfoContainer>
        </FullScreenInfo>
    )
}

export default SuccessfullRegistration