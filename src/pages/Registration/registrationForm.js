import { useFormik } from "formik"
import validationSchema, { initialValues } from "../../formSchemas/registerationFormSchema"
import SuccessfullRegistration from "./SuccessfullRegistration"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { initiateRegisterAction } from "../../store/actions/authActions/registerActions"

const RegistrationForm = () => {
    const registerReducerData = useSelector(reducers => reducers.registerReducer)
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        validateOnChange: true,
        onSubmit: (values) => {
            dispatch(initiateRegisterAction(values.email, values.password))
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
        <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
                <input className="form-input" name="email" placeholder="Enter Email" onChange={handleChange} value={formik.values.email} />
                <div className="form-error">
                    {formik.touched.email ? formik.errors.email : ""}
                </div>
            </div>
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

export default RegistrationForm