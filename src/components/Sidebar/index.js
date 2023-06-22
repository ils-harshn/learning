import { SidebarLabel, SidebarLink, SidebarSubLink, SidebarTab, SidebarTabContainer } from "./sidebar.styles"

const Sidebar = () => {
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

        </SidebarTabContainer>
    )
}

export default Sidebar