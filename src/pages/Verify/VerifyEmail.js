import { useDispatch, useSelector } from "react-redux"
import { initiateVerifyEmail } from "../../store/actions/authActions/verifyEmailActions"

const VerifyEmail = ({ oobcode }) => {
    const dispatch = useDispatch()
    const verifyEmailReducerData = useSelector(reducers => reducers.verifyEmailReducer)

    const handleCloseTab = () => {
        setTimeout(() => {
            window.close();
        }, 3000);
    }

    if (verifyEmailReducerData.error)
        return <p>{verifyEmailReducerData.error}</p>

    if (verifyEmailReducerData.success){
        handleCloseTab()
        return <div>
            <p>{verifyEmailReducerData.success}</p>
            <p>Closing the tab in 3 seconds</p>
        </div>
    }

    return (
        <button onClick={() => dispatch(initiateVerifyEmail(oobcode))} disabled={verifyEmailReducerData.loading}>
            Verify
        </button>
    )
}

export default VerifyEmail