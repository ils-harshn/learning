import { useDispatch, useSelector } from "react-redux"
import { initiateVerifyEmail } from "../../store/actions/authActions/verifyEmailActions"
import { ButtonLoaderIcon, Form, FormContainer, FormFooter, FormGroup, FormGroupLabel, FormSubmitButton, FormTitle } from "../Login/styles/loginForm.styles"
import { Link } from "react-router-dom"

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

    if (verifyEmailReducerData.success) {
        handleCloseTab()
        return <div>
            <p>{verifyEmailReducerData.success}</p>
            <p>Closing the tab in 3 seconds</p>
        </div>
    }

    return (
        <FormContainer>
            <Form>
                <FormTitle>Confirm Your Email</FormTitle>
                <FormSubmitButton onClick={() => dispatch(initiateVerifyEmail(oobcode))} disabled={verifyEmailReducerData.loading}>
                    {verifyEmailReducerData.loading ? <ButtonLoaderIcon /> : "Verify"}
                </FormSubmitButton>
            </Form>
            <FormFooter>
                <p>In case you didn't generated this request</p>
                <p><Link to={"here"}>report that here</Link></p>
            </FormFooter>
        </FormContainer>
    )
}

export default VerifyEmail