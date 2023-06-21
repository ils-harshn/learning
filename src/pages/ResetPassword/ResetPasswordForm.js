import { useFormik } from "formik";
import emailVerifySchema, { initialEmailValue } from "../../formSchemas/resetPasswordFormSchema";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { initiateSendResetPasswordEmail } from "../../store/actions/authActions/sendResetPasswordEmailActions";
import { Link } from "react-router-dom";
import { ButtonLoaderIcon, Form, FormContainer, FormFooter, FormGroup, FormGroupError, FormGroupInput, FormGroupLabel, FormSubmitButton, FormTitle } from "../Login/styles/loginForm.styles";
import { FullScreenInfo, InfoContainer, SuccessMessage } from "../../styles/notifiers/info.styles";

const ResetPasswordForm = () => {

    const dispatch = useDispatch()
    const sendResetPasswordReducerData = useSelector(reducers => reducers.sendResetPasswordEmailReducer)

    const formik = useFormik({
        initialValues: initialEmailValue,
        validationSchema: emailVerifySchema,
        validateOnChange: true,
        onSubmit: (values) => {
            dispatch(initiateSendResetPasswordEmail(values.email))
        }
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        formik.setFieldTouched(name, true); // Remember to mark the toched field first
        formik.setFieldValue(name, value);
    }
    useEffect(() => {
        formik.setSubmitting(sendResetPasswordReducerData.loading)
        formik.setFieldError("email", sendResetPasswordReducerData.error)
    }, [sendResetPasswordReducerData])


    if (sendResetPasswordReducerData.success)
        return (
            <FullScreenInfo>
                <InfoContainer>
                    <h3>Reset Password Email Sent</h3>
                    <SuccessMessage>Check your <Link to="https://mail.google.com/" target="_blank" rel="noreferrer">indox</Link> a has been sent with verification link to reset password.</SuccessMessage>
                </InfoContainer>
            </FullScreenInfo>
        )


    return (
        <>
            <FormContainer>
                <Form onSubmit={formik.handleSubmit}>
                    <FormTitle>Reset Password Form</FormTitle>
                    <FormGroup>
                        <FormGroupLabel>Email</FormGroupLabel>
                        <FormGroupInput type="text" name="email" onChange={handleChange} value={formik.values.email} />
                        <FormGroupError className="form-error">
                            {formik.touched.email ? formik.errors.email : ""}
                        </FormGroupError>
                    </FormGroup>
                    <FormSubmitButton type="submit" disabled={!formik.dirty || !formik.isValid || formik.isSubmitting}>{formik.isSubmitting ? <ButtonLoaderIcon /> : "Reset Password"}</FormSubmitButton>
                </Form>
                <FormFooter>
                    <p>Got your password? <Link to={"/accounts/login"}>Try log in</Link></p>
                </FormFooter>
            </FormContainer>
        </>
    )
}

export default ResetPasswordForm