import { Outlet, Link, useNavigate } from "react-router-dom";
import { is_token_available } from "../../api";
import { useEffect, useState } from "react";
import { Loader, clearToken } from "../../utils";
import Navbar from "../../Components/Navbar"

const Layout = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const redirect_if_token_not_available = async () => {
        let token = await is_token_available();
        if (token == false) {
            navigate("/auth/login")
            clearToken();
            return;
        }
        else setIsLoggedIn(true);
    }

    useEffect(() => {
        redirect_if_token_not_available();
    }, [])

    return (isLoggedIn) ? <>
        <div className="" style={{
            height: "calc(100vh - 162px)",
            // marginTop: 80,
        }}>
            <Outlet />
        </div>
    </> : <Loader />
};

export default Layout;