import { useNavigate } from "react-router-dom"
import { NabLogo, NavLoginButton, NavRegisterButton, NavTabContainer, NavbarContainer, NavbarWrapper, SearchBarContainer, SearchInput, Tab } from "./index.styles"

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
                        About
                    </Tab>
                    <Tab>
                        Product
                    </Tab>
                    <Tab>
                        For Team
                    </Tab>
                </NavTabContainer>

                <SearchBarContainer>
                    <span className="material-symbols-outlined">
                        search
                    </span>
                    <SearchInput placeholder="Search..."></SearchInput>
                </SearchBarContainer>

                <NavLoginButton onClick={() => navigate("/accounts/login")}>
                    Log in
                </NavLoginButton>
                <NavRegisterButton onClick={() => navigate("/accounts/register")}>
                    Sign up
                </NavRegisterButton>
            </NavbarWrapper>
        </NavbarContainer>
    )
}

export default Navbar