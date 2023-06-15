import { applyActionCode } from "firebase/auth"
import { auth } from "../../firebase"
import { useState } from "react"
import { useLocation } from "react-router-dom"

const EmailVerify = () => {
    const [verifying, setVerifying] = useState(true)
    const [verified, setVerified] = useState(false)
    const [clicked, setClicked] = useState(false)

    const urlParams = new URLSearchParams(useLocation().search);
    const oobCode = urlParams.get('oobCode');

    const verifyEmail = async () => {
        setClicked(true)
        await applyActionCode(auth, oobCode)
            .then(() => setVerified(true))
            .catch(() => setVerified(false))
        setVerifying(false)
    }

    if (verifying == false) {
        return <>
            { verified ? <h3>Verified</h3>: <h3>Not Verified</h3> }
        </>
    }

    return (
        <>
            <button disabled={clicked} onClick={verifyEmail}>
                {clicked ? "Verifing" : "Confirm to verify"}
            </button>
        </>
    )
}

export default EmailVerify