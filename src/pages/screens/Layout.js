import { Outlet, Link, useNavigate } from "react-router-dom";
import { is_token_available } from "../../api";
import { useEffect, useState } from "react";
import { Loader } from "../../utils";


const Layout = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const redirect_if_token_not_available = async () => {
        let token = await is_token_available();
        if (token == false) {
            navigate("/auth/login")
            return;
        }
        else setIsLoggedIn(true);
    }

    useEffect(() => {
        redirect_if_token_not_available();
    }, [])

    return (isLoggedIn) ? <>
        <nav className="navbar navbar-light bg-light">
            <a className="navbar-brand" href="/" style={{
                marginLeft: 20,
                textDecoration: "none",
                fontWeight: 600,
            }}>Cart Js</a>
            <i class="fa fa-shopping-cart" style={{
                marginRight: 20,
                fontSize: 28,
            }}></i>
        </nav>
        <div style={{
            height: "calc(100vh - 130px)",
            overflowY: "auto",
        }}>
            <Outlet />
        </div>
        <footer className="text-center text-lg-start bg-light text-muted">
            <div
                className="text-center p-4"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
            >
                © 2023 Copyright:  
                <a className="text-reset fw-bold" href="/">
                    CartJS
                </a>
            </div>
        </footer>
    </> : <Loader />
};

export default Layout;