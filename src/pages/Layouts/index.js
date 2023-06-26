import { Outlet } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import NotSignedIn from "./NotSignedIn";
import NotVerifiedEmail from "./NotVerifiedEmail";
import FullPageLoader from "../../components/Loaders/FullPageLoader";
import Navbar from "../../components/Navbar";
import { MainContainer, MainLayout, SideBarContainer } from "../../styles/containers/containers.styles";
import Sidebar from "../../components/Sidebar";
import { useRef } from "react";

const Layout = () => {
    const [user, loading, error] = useAuthState(auth)
    const sidebarContainerRef = useRef()

    if (loading) return <FullPageLoader />

    if (error) return <p>Error Please Reload</p>

    if (!user) return <NotSignedIn />

    if (!user.emailVerified) return <NotVerifiedEmail user={user} />


    return (
        <>
            <Navbar sidebarContainerRef={sidebarContainerRef}/>
            <MainContainer>
                <MainLayout>
                    <SideBarContainer ref={sidebarContainerRef}>
                        <Sidebar />
                    </SideBarContainer>
                    <Outlet />
                </MainLayout>
            </MainContainer>
        </>
    )
}

export default Layout


export { AuthLayout };