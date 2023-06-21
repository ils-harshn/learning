import { Link } from "react-router-dom"
import AuthNavbar from "../../components/AuthNavbar"
import { FullScreenInfo, InfoContainer, SuccessMessage } from "../../styles/notifiers/info.styles"

const NotSignedIn = () => {
    return (
        <>
            <AuthNavbar />
            <FullScreenInfo>
                <InfoContainer>
                    <h3>Authentication is required</h3>
                    <ul>
                        <li><SuccessMessage>Already have an account? <Link to="/accounts/login">Log in here</Link></SuccessMessage></li>
                        <li><SuccessMessage>Do not have an account? <Link to="/accounts/register">Sign up here</Link></SuccessMessage></li>
                    </ul>
                </InfoContainer>
            </FullScreenInfo>
        </>
    )
}

export default NotSignedIn