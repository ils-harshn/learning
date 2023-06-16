import { useFormik } from "formik";
import emailVerifySchema, { initialEmailValue } from "../../formSchemas/resetPasswordFormSchema";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { initiateSendResetPasswordEmail } from "../../store/actions/authActions/sendResetPasswordEmailActions";
import { Link } from "react-router-dom";

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
            <p>Check your <Link to="https://mail.google.com/" target="_blank" rel="noreferrer">indox</Link> a has been sent with verification link to reset password.</p>
        )


    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
                <input className="form-input" name="email" placeholder="Enter Email" onChange={handleChange} value={formik.values.email} />
                <div className="form-error">
                    {formik.touched.email ? formik.errors.email : ""}
                </div>
            </div>
            <button type="submit" disabled={!formik.dirty || !formik.isValid || formik.isSubmitting}>{formik.isSubmitting ? "Loading" : "Reset Password"}</button>
        </form>
    )
}

export default ResetPasswordForm