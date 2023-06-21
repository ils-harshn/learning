import { Link } from "react-router-dom"
import AuthNavbar from "../../components/AuthNavbar"
import { FullScreenInfo, InfoContainer } from "../../styles/notifiers/info.styles"

const NotSignedIn = () => {
    return (
        <>
            <AuthNavbar />
            <FullScreenInfo>
                <InfoContainer>
                    <p>You are signed out</p>
                    <Link to="/accounts/login">Login</Link>
                    <p>Do not have accounts or need a another account</p>
                    <Link to="/accounts/register">Register</Link>
                </InfoContainer>
            </FullScreenInfo>
        </>
    )
}

export default NotSignedIn