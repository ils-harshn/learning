import { useDispatch, useSelector } from "react-redux"
import { initiateVerifyEmail } from "../../store/actions/authActions/verifyEmailActions"
import { ButtonLoaderIcon, Form, FormContainer, FormFooter, FormGroupError, FormSubmitButton, FormTitle } from "../Login/styles/loginForm.styles"
import { Link } from "react-router-dom"
import { FullScreenInfo, InfoContainer, SuccessMessage } from "../../styles/notifiers/info.styles"

const VerifyEmail = ({ oobcode }) => {
    const dispatch = useDispatch()
    const verifyEmailReducerData = useSelector(reducers => reducers.verifyEmailReducer)

    const handleCloseTab = () => {
        setTimeout(() => {
            window.close();
        }, 3000);
    }

    if (verifyEmailReducerData.error)
        return <FullScreenInfo>
        <InfoContainer>
            <ul>
                <li><FormGroupError>{verifyEmailReducerData.error}</FormGroupError></li>
                <li><SuccessMessage>Please resend the url again. <Link to={"/accounts/login"}>Try to send email again</Link></SuccessMessage></li>
            </ul>
        </InfoContainer>
    </FullScreenInfo>

    if (verifyEmailReducerData.success) {
        handleCloseTab()
        return <FullScreenInfo>
            <InfoContainer>
                <h3>{verifyEmailReducerData.success}</h3>
                <p>Closing the tab in 3 seconds</p>
            </InfoContainer>
        </FullScreenInfo>
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