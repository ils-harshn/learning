import { useFormik } from "formik"
import validationSchema, { initialValues } from "../../formSchemas/loginFormSchema"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { initiateLoginAction } from "../../store/actions/authActions/loginActions"
import { ButtonLoaderIcon, Form, FormContainer, FormFooter, FormGroup, FormGroupError, FormGroupInput, FormGroupLabel, FormLabelGroup, FormLink, FormSubmitButton, RememberMeCheckbox, RememberMeGroup, RememberMeLabel } from "./styles/loginForm.styles"

const LoginForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const loginReducerState = useSelector(reducers => reducers.loginReducer)

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        validateOnChange: true,
        onSubmit: (values) => {
            dispatch(initiateLoginAction(values.email, values.password, values.rememberMe))
        }
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        formik.setFieldTouched(name, true); // Remember to mark the toched field first
        formik.setFieldValue(name, value);
    }

    useEffect(() => {
        if (loginReducerState.success) navigate("/")
        formik.setSubmitting(loginReducerState.loading)
        formik.setFieldError("email", loginReducerState.error)
    }, [loginReducerState])


    return (
        <FormContainer>
            <Form onSubmit={formik.handleSubmit}>
                <FormGroup>
                    <FormGroupLabel>Email</FormGroupLabel>
                    <FormGroupInput type="text" name="email" onChange={handleChange} value={formik.values.email} />
                    <FormGroupError className="form-error">
                        {formik.touched.email ? formik.errors.email : ""}
                    </FormGroupError>
                </FormGroup>
                <FormGroup>
                    <FormLabelGroup>
                        <FormGroupLabel>Password</FormGroupLabel>
                        <FormLink to={"/accounts/forgetpassword"}>Forget Password?</FormLink>
                    </FormLabelGroup>
                    <FormGroupInput name="password" type="password" onChange={handleChange} value={formik.values.password} />
                    <FormGroupError className="form-error">
                        {formik.touched.password ? formik.errors.password : ""}
                    </FormGroupError>
                </FormGroup>
                <RememberMeGroup>
                    <RememberMeLabel htmlFor="rememberMe">Remember Me</RememberMeLabel>
                    <RememberMeCheckbox name="rememberMe" onChange={formik.handleChange} checked={formik.values.rememberMe} />
                </RememberMeGroup>
                <FormSubmitButton type="submit" disabled={!formik.dirty || !formik.isValid || formik.isSubmitting}>{formik.isSubmitting ? <ButtonLoaderIcon /> : "Log in"}</FormSubmitButton>
            </Form>
            <FormFooter>
                <p>Don't have an account? <Link to={"/accounts/register"}>Sign up</Link></p>
            </FormFooter>
        </FormContainer>
    )
}

export default LoginForm