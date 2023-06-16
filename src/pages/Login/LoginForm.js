import { useFormik } from "formik"
import validationSchema, { initialValues } from "../../formSchemas/loginFormSchema"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { initiateLoginAction } from "../../store/actions/authActions/loginActions"

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
                <label htmlFor="rememberMe">Remember Me</label>
                <input className="form-input" name="rememberMe" type="checkbox" onChange={formik.handleChange} checked={formik.values.rememberMe} />
            </div>
            <button type="submit" disabled={!formik.dirty || !formik.isValid || formik.isSubmitting}>{formik.isSubmitting ? "Loading" : "Login"}</button>
        </form>
    )
}

export default LoginForm