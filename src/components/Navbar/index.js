import { NabLogo, NavTabContainer, NavbarContainer, NavbarWrapper, SearchBarContainer, SearchInput, Tab } from "../AuthNavbar/index.styles"

const Navbar = ({ sidebarContainerRef }) => {
    const toggleSidebar = () => {
        sidebarContainerRef.current.style.display = sidebarContainerRef.current.style.display == "block" ? "none": "block"
    }
    
    return (
        <NavbarContainer>
            <NavbarWrapper>
                <span className="material-symbols-outlined" onClick={toggleSidebar}>
                    menu
                </span>
                <NabLogo>
                    Assemblage
                </NabLogo>
                <NavTabContainer>
                    <Tab>
                        Product
                    </Tab>
                </NavTabContainer>

                <SearchBarContainer>
                    <span className="material-symbols-outlined">
                        search
                    </span>
                    <SearchInput placeholder="Search..."></SearchInput>
                </SearchBarContainer>
            </NavbarWrapper>
        </NavbarContainer>
    )
}

export default Navbar