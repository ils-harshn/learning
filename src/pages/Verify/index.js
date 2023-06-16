import { useLocation } from "react-router-dom"
import VerifyEmail from "./VerifyEmail"

const Verify = () => {
    const urlParams = new URLSearchParams(useLocation().search);
    const mode = urlParams.get('mode')
    const oobCode = urlParams.get('oobCode');

    switch (mode) {
        case "verifyEmail":
            return <VerifyEmail oobcode={oobCode} />
        default:
            return <p>Invalid Url</p>
    }
}

export default Verify