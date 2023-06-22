import { Outlet } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import NotSignedIn from "./NotSignedIn";
import NotVerifiedEmail from "./NotVerifiedEmail";
import FullPageLoader from "../../components/Loaders/FullPageLoader";
import Navbar from "../../components/Navbar";

const Layout = () => {
    const [user, loading, error] = useAuthState(auth)

    if (loading) return <FullPageLoader />

    if (error) return <p>Error Please Reload</p>

    if (!user) return <NotSignedIn />

    if (!user.emailVerified) return <NotVerifiedEmail user={user} />

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default Layout


export { AuthLayout };