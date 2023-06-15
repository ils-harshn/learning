import { Outlet } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import NotSignedIn from "./NotSignedIn";

const Layout = () => {
    const [user, loading, error] = useAuthState(auth)

    if (loading) return <p>Loading</p>

    if (error) return <p>Error Please Reload</p>

    if (!user) return <NotSignedIn />

    return (
        <>
            <Outlet />
        </>
    )
}

export default Layout


export { AuthLayout };