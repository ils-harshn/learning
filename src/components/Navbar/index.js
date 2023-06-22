import { useNavigate } from "react-router-dom"
import { NabLogo, NavTabContainer, NavbarContainer, NavbarWrapper, SearchBarContainer, SearchInput, Tab } from "../AuthNavbar/index.styles"

const Navbar = () => {
    const navigate = useNavigate()

    return (
        <NavbarContainer>
            <NavbarWrapper>
                <span className="material-symbols-outlined">
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