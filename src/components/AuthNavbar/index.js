import { NabLogo, NavLoginButton, NavRegisterButton, NavTabContainer, NavbarContainer, NavbarWrapper, SearchBarContainer, SearchInput, Tab, Title } from "./index.styles"

const Navbar = () => {
    return (
        <NavbarContainer>
            <NavbarWrapper>
                <span class="material-symbols-outlined">
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
                    <span class="material-symbols-outlined">
                        search
                    </span>
                    <SearchInput placeholder="Search..."></SearchInput>
                </SearchBarContainer>

                <NavLoginButton>
                    Log in
                </NavLoginButton>
                <NavRegisterButton>
                    Sign up
                </NavRegisterButton>
            </NavbarWrapper>
        </NavbarContainer>
    )
}

export default Navbar