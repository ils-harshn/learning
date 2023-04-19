import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken, is_token_available } from "../../api"
import { check_field, setToken } from "../../utils";

const Login = () => {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(true);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(true);
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const redirect_if_token_available = async () => {
        let token = await is_token_available();
        if (token) navigate("/");
        setLoading(false);
        return token;
    }

    useEffect(() => {
        redirect_if_token_available();
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)
        let token = await getAccessToken(email, password);
        if (token) {
            setToken(token, rememberMe)
            navigate("/")
        }
        setPasswordError("Invalid email or password");
        setLoading(false)
    }

    return (
        <>
            <div className="row">
                <div className="mx-auto col-10 col-md-8 col-lg-6">
                    <form className="form-example m-5 p-5 border border-info rounded" onSubmit={handleSubmit}>
                        <h1>Cart Js: Login</h1>
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
                            <label htmlFor="Password">Password:</label>
                            <input
                                value={password}
                                onChange={(e) => check_field(e, setPassword, setPasswordError, "*")}
                                type="text"
                                className="form-control Password"
                                id="Password"
                                placeholder="Enter Password"
                                name="Password"
                                autoComplete="off"
                            />
                            <small className="text-danger">{passwordError}</small>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                            <label className="form-check-label" htmlFor="flexCheckChecked" >
                                Remember Me
                            </label>
                        </div>
                        <button type="submit" className="btn btn-primary btn-customized mt-4" disabled={emailError || passwordError || loading}>
                            {loading ? <>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                <span className="sr-only">Loading...</span>
                            </> : "Login"}
                        </button>
                        <p>Not registered? <a href="/auth/register">register here</a></p>
                    </form>
                </div>
            </div>
        </>
    )
}


export default Login;