import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { check_field } from "../../utils";
import { createUser } from "../../api";

const Register = () => {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(true);

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(true);

    const [firstName, setFirstName] = useState("");
    const [firstNameError, setFirstNameError] = useState(true);

    const [lastName, setLastName] = useState("");
    const [lastNameError, setLastNameError] = useState(true);

    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState(true);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)
        let data = await createUser(email, password, confirmPassword, firstName, lastName);
        if (data) {
            navigate('/auth/login');
            return;
        }
        else setEmailError("This email is already registered")
        setLoading(false)
    }

    return (
        <>
            <div className="row">
                <div className="mx-auto col-10 col-md-8 col-lg-6">
                    <form className="form-example m-5 p-5 border border-info" onSubmit={handleSubmit}>
                        <h1>Cart Js: Registration</h1>
                        <p className="description">
                            Simple web to depict a cart system
                        </p>
                        <div className="form-group">
                            <label htmlFor="Email">Email:</label>
                            <input
                                value={email}
                                onChange={(e) => check_field(e, setEmail, setEmailError, "email")}
                                type="text"
                                className="form-control Email"
                                id="Email"
                                placeholder="Enter Email"
                                name="Email"
                            />
                            <small className="text-danger">{emailError}</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="FirstName">FirstName:</label>
                            <input
                                value={firstName}
                                onChange={(e) => check_field(e, setFirstName, setFirstNameError, "*")}
                                type="text"
                                className="form-control FirstName"
                                id="FirstName"
                                placeholder="Enter FirstName"
                                name="FirstName"
                            />
                            <small className="text-danger">{firstNameError}</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="LastName">LastName:</label>
                            <input
                                value={lastName}
                                onChange={(e) => check_field(e, setLastName, setLastNameError, "*")}
                                type="text"
                                className="form-control LastName"
                                id="LastName"
                                placeholder="Enter LastName"
                                name="LastName"
                            />
                            <small className="text-danger">{lastNameError}</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Password">Password:</label>
                            <input
                                value={password}
                                onChange={(e) => {
                                    check_field(e, setPassword, setPasswordError, "password");
                                    if (setConfirmPasswordError != true && e.target.value != confirmPassword) setConfirmPasswordError("Password doesn't match")
                                    else setConfirmPasswordError("")
                                }}
                                type="text"
                                className="form-control Password"
                                id="Password"
                                placeholder="Enter Password"
                                name="Password"
                                autoComplete="off"
                            />
                            <small className="text-danger">{passwordError}</small>
                        </div>

                        <div className="form-group">
                            <label htmlFor="ConfirmPassword">ConfirmPassword:</label>
                            <input
                                value={confirmPassword}
                                onChange={(e) => {
                                    check_field(e, setConfirmPassword, setConfirmPasswordError, "*")
                                    if (e.target.value && password == e.target.value) setConfirmPasswordError("")
                                    else setConfirmPasswordError("*Password doesn't match")
                                }}
                                type="text"
                                className="form-control ConfirmPassword"
                                id="ConfirmPassword"
                                placeholder="Enter ConfirmPassword"
                                name="ConfirmPassword"
                                autoComplete="off"
                            />
                            <small className="text-danger">{confirmPasswordError}</small>
                        </div>

                        <button type="submit" className="btn btn-primary btn-customized mt-4" disabled={emailError || passwordError || firstNameError || lastNameError || confirmPasswordError || loading}>
                            {loading ? <>
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Loading...
                            </> : "Register"}
                        </button>
                        <p>Already registered? <a href="/auth/login">login here</a></p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register;