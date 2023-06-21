import { useFormik } from "formik"
import { initialPasswordsValues, validationOnPasswordsSchema } from "../../formSchemas/resetPasswordFormSchema"
import { useDispatch, useSelector } from "react-redux"
import { initiateVerifyResetPassword } from "../../store/actions/authActions/verifyResetPasswordActions"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { ButtonLoaderIcon, Form, FormContainer, FormFooter, FormGroup, FormGroupError, FormGroupInput, FormGroupLabel, FormSubmitButton } from "../Login/styles/loginForm.styles"

const VerifyResetPassword = ({ oobcode }) => {
    const dispatch = useDispatch()
    const verifyResetPasswordReducerData = useSelector(reducers => reducers.verifyResetPasswordReducer)

    const formik = useFormik({
        initialValues: initialPasswordsValues,
        validationSchema: validationOnPasswordsSchema,
        validateOnChange: true,
        onSubmit: (values) => {
            dispatch(initiateVerifyResetPassword(oobcode, values.password))
        }
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        formik.setFieldTouched(name, true); // Remember to mark the toched field first
        formik.setFieldValue(name, value);
    }

    useEffect(() => {
        formik.setSubmitting(verifyResetPasswordReducerData.loading)
        formik.setFieldError("confirmPassword", verifyResetPasswordReducerData.error)
    }, [verifyResetPasswordReducerData])

    if (verifyResetPasswordReducerData.success) return <p>Password Reset Successfull, <Link to={"/accounts/login"}>Login with your new password.</Link></p>

    return (
        <FormContainer>
            <Form onSubmit={formik.handleSubmit}>
                <FormGroup>
                    <FormGroupLabel>Password</FormGroupLabel>
                    <FormGroupInput name="password" type="password" onChange={handleChange} value={formik.values.password} />
                    <FormGroupError className="form-error">
                        {formik.touched.password ? formik.errors.password : ""}
                    </FormGroupError>
                </FormGroup>
                <FormGroup>
                    <FormGroupLabel>Confirm Password</FormGroupLabel>
                    <FormGroupInput type="password" name="confirmPassword" onChange={handleChange} value={formik.values.confirmPassword} />
                    <FormGroupError className="form-error">
                        {formik.touched.confirmPassword ? formik.errors.confirmPassword : ""}
                    </FormGroupError>
                </FormGroup>
                <FormSubmitButton type="submit" disabled={!formik.dirty || !formik.isValid || formik.isSubmitting}>{formik.isSubmitting ? <ButtonLoaderIcon /> : "Change Password"}</FormSubmitButton>
            </Form>
            <FormFooter>
                <p>Already have an account? <Link to={"/accounts/login"}>Log in</Link></p>
            </FormFooter>
        </FormContainer>
    )
}

export default VerifyResetPassword