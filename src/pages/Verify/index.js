import { Link, useLocation } from "react-router-dom"
import VerifyEmail from "./VerifyEmail"
import VerifyResetPassword from "./VerifyResetPassword";
import { FullScreenInfo, InfoContainer, SuccessMessage } from "../../styles/notifiers/info.styles";

const Verify = () => {
    const urlParams = new URLSearchParams(useLocation().search);
    const mode = urlParams.get('mode')
    const oobCode = urlParams.get('oobCode');

    switch (mode) {
        case "verifyEmail":
            return <VerifyEmail oobcode={oobCode} />
        case "resetPassword":
            return <VerifyResetPassword oobcode={oobCode} />
        default:
            return <FullScreenInfo>
            <InfoContainer>
                <ul>
                    <li><SuccessMessage>To verify email. <Link to={"/accounts/login"}>send verification email from here</Link></SuccessMessage></li>
                    <li><SuccessMessage>In case of too many requests have been made wait for twenty minutes and resend email.</SuccessMessage></li>
                    <li><SuccessMessage>To resend email for verification, first login.</SuccessMessage></li>
                    <li><SuccessMessage>In case you forgot password, try to reset that from <Link to={"/accounts/forgetpassword"}>here</Link>.</SuccessMessage></li>
                </ul>
            </InfoContainer>
        </FullScreenInfo>
    }
}

export default Verify