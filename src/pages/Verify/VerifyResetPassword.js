import { useFormik } from "formik"
import { initialPasswordsValues, validationOnPasswordsSchema } from "../../formSchemas/resetPasswordFormSchema"
import { useDispatch, useSelector } from "react-redux"
import { initiateVerifyResetPassword } from "../../store/actions/authActions/verifyResetPasswordActions"
import { useEffect } from "react"
import { Link } from "react-router-dom"

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