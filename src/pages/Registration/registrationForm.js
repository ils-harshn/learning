import { useFormik } from "formik"
import validationSchema, { initialValues } from "../../formSchemas/registerationFormSchema"
import requestRegisterUser from "../../firebase/requests/registerUser"
import SuccessfullRegistration from "./successfullRegistration"
import { useState } from "react"

const RegistrationForm = () => {
    const [user, setUser] = useState(null)

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        validateOnChange: true,
        onSubmit: (values) => {
            registerUser(values.email, values.password)
        }
    })

    const registerUser = async (email, password) => {
        formik.setSubmitting(true)
        let data = await requestRegisterUser(email, password)
        if (data.code) formik.setFieldError("email", "*Email already in use.")
        else setUser(data)
        formik.setSubmitting(false)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        formik.setFieldTouched(name, true); // Remember to mark the toched field first
        formik.setFieldValue(name, value);
    }

    if (user) return <SuccessfullRegistration user={user} />

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
            <button type="submit" disabled={!formik.isValid || formik.isSubmitting}>{formik.isSubmitting ? "Loading" : "Register"}</button>
        </form>
    )
}

export default RegistrationForm