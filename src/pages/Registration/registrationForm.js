import { useFormik } from "formik"
import validationSchema, { initialValues } from "../../formSchemas/registerationFormSchema"
import SuccessfullRegistration from "./successfullRegistration"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { initiateRegisterAction } from "../../store/actions/authActions/registerActions"
import { ButtonLoaderIcon, FormContainer, Form, FormFooter, FormGroup, FormGroupError, FormGroupInput, FormGroupLabel, FormSubmitButton } from "../Login/styles/loginForm.styles"
import { Link } from "react-router-dom"

const RegistrationForm = () => {
    const registerReducerData = useSelector(reducers => reducers.registerReducer)
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        validateOnChange: true,
        onSubmit: (values) => {
            dispatch(initiateRegisterAction(values.email, values.password, values.fullName))
        }
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        formik.setFieldTouched(name, true); // Remember to mark the toched field first
        formik.setFieldValue(name, value);
    }

    useEffect(() => {
        formik.setSubmitting(registerReducerData.loading)
        formik.setFieldError("email", registerReducerData.error)
    }, [registerReducerData])


    if (registerReducerData.success) return <SuccessfullRegistration user={registerReducerData.success} />

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
                    <FormGroupLabel>Full name</FormGroupLabel>
                    <FormGroupInput type="text" name="fullName" onChange={handleChange} value={formik.values.fullName} />
                    <FormGroupError className="form-error">
                        {formik.touched.fullName ? formik.errors.fullName : ""}
                    </FormGroupError>
                </FormGroup>

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
                <FormSubmitButton type="submit" disabled={!formik.dirty || !formik.isValid || formik.isSubmitting}>{formik.isSubmitting ? <ButtonLoaderIcon /> : "Sign up"}</FormSubmitButton>
            </Form>
            <FormFooter>
                <p>Already have an account? <Link to={"/accounts/login"}>Log in</Link></p>
            </FormFooter>
        </FormContainer>
    )
}

export default RegistrationForm