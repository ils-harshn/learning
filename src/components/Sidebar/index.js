import { useDispatch } from "react-redux"
import { SidebarButton, SidebarLabel, SidebarLink, SidebarSubLink, SidebarTab, SidebarTabContainer } from "./sidebar.styles"
import { initiateLogoutAction } from "../../store/actions/authActions/loginActions"

const Sidebar = () => {
    const dispatch = useDispatch()

    return (
        <SidebarTabContainer>
            <SidebarTab>
                <SidebarLink to={"/"}>Home</SidebarLink>
            </SidebarTab>
            <SidebarTab>
                <SidebarLink to={"/rooms"}>ROOMS</SidebarLink>
            </SidebarTab>
            
            <SidebarTab>
                <SidebarLabel>PUBLIC</SidebarLabel>
            </SidebarTab>
                <SidebarTab>
                    <SidebarSubLink to={"/questions"}>Questions</SidebarSubLink>
                </SidebarTab>
                <SidebarTab>
                    <SidebarSubLink to={"/tags"}>Tags</SidebarSubLink>
                </SidebarTab>
                <SidebarTab>
                    <SidebarSubLink to={"/users"}>Users</SidebarSubLink>
                </SidebarTab>
                <SidebarTab>
                    <SidebarSubLink to={"/companies"}>Companies</SidebarSubLink>
                </SidebarTab>
            
            <SidebarTab>
                <SidebarButton onClick={() => dispatch(initiateLogoutAction())}>Log Out</SidebarButton>
            </SidebarTab>

        </SidebarTabContainer>
    )
}

export default Sidebar