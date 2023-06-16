// import { useDispatch, useSelector } from "react-redux"
// import { initiateVerifyEmail } from "../../store/actions/authActions/verifyEmailActions"

import { useFormik } from "formik"
import { initialPasswordsValues, validationOnPasswordsSchema } from "../../formSchemas/resetPasswordFormSchema"

const VerifyResetPassword = ({ oobcode }) => {

    const formik = useFormik({
        initialValues: initialPasswordsValues,
        validationSchema: validationOnPasswordsSchema,
        validateOnChange: true,
        onSubmit: (values) => {
            // dispatch(initiateRegisterAction(values.email, values.password))
            console.log(values)
        }
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        formik.setFieldTouched(name, true); // Remember to mark the toched field first
        formik.setFieldValue(name, value);
    }

    // useEffect(() => {
    //     formik.setSubmitting(registerReducerData.loading)
    //     formik.setFieldError("email", registerReducerData.error)
    // }, [registerReducerData])

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
                <input className="form-input" name="password" placeholder="Enter Password" onChange={handleChange} value={formik.values.password} />
                <div className="form-error">
                    {formik.touched.password ? formik.errors.password : ""}
                </div>
            </div>
            <div className="form-group">
                <input className="form-input" name="confirmPassword" placeholder="Enter Confirm Password" onChange={handleChange} value={formik.values.confirmPassword} />
                <div className="form-error">
                    {formik.touched.confirmPassword ? formik.errors.confirmPassword : ""}
                </div>
            </div>
            <button type="submit" disabled={!formik.dirty || !formik.isValid || formik.isSubmitting}>{formik.isSubmitting ? "Loading" : "Register"}</button>
        </form>
    )
}

export default VerifyResetPassword