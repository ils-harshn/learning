import { css, styled } from "styled-components";

export const NavbarContainer = styled.nav`
    ${({ theme }) => css`
        cursor: pointer;
        background-color: ${theme.colors.navbarBackground};
        border-top: 3px solid ${theme.colors.navbarBorderTop};
        border-bottom: 1px solid ${theme.colors.navbarBorderBottom};
        height: ${theme.dimensions.navbarHeight};
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        display: flex;
        justify-content: center;
    `}
`

export const NavbarWrapper = styled.div`
    ${({ theme }) => css`
        width: 1200px;
        max-width: 1200px;
        height: inherit;
        display: flex;
        align-items: center;

        > span {
            width: 48px;
            height: inherit;
            display: flex;
            justify-content: center;
            align-items: center;

            &:hover {
                background-color: ${theme.colors.tabHover};
            }
        }
    `}
`

export const NabLogo = styled.div`
    ${({ theme }) => css`
        font-size: 22px;
        height: inherit;
        display: flex;
        padding: 0 10px 0 10px;
        align-items: center;
        font-weight: 600;

        &:hover {
            background-color: ${theme.colors.tabHover};
        }

        @media screen and (max-width: 370px) {
            display: none;
        }
    `}
`

export const NavTabContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

export const Tab = styled.div`
    ${({ theme }) => css`
        padding: 6px 12px 6px 12px;
        font-size: 13px;
        line-height: 17px;
        border-radius: 18px;

        &:hover {
                background-color: ${theme.colors.tabHover};
        }

        @media screen and (max-width: 750px) {
            display: none;
        }
    `}
`

export const SearchBarContainer = styled.div`
    ${({ theme }) => css`
        margin: 0 8px 0 8px;
        flex-grow: 1;
        height: 32px;
        border: 1px solid ${theme.colors.navbarSearchBorderColor};
        display: flex;
        border-radius: 6px;
        overflow: hidden;

        span {
            padding: 4px;
        }

        @media screen and (max-width: 540px) {
            border: none;
            justify-content: right;
        }

        @media screen and (max-width: 371px) {
            display: none;
        }
    `}
`

export const SearchInput = styled.input`
    ${({ theme }) => css`
        flex-grow: 1;
        outline: none;
        border: none;
        color: ${theme.colors.input};

        &::placeholder {
            color: ${theme.colors.inputPlaceHolder};
        }

        @media screen and (max-width: 540px) {
            display: none;
        }
    `}
`

export const NavLoginButton = styled.button`
    ${({ theme }) => css`
        cursor: pointer;
        margin-right: 4px;
        font-size: 13px;
        line-height: 6px;
        width: fit-content;
        height: 34px;
        padding: 8px 10px 8px 10px;

        outline: none;
        border: 1px solid ${theme.colors.primaryBorderLightColor};
        border-radius: 6px;
        background-color: ${theme.colors.primaryBackgroundLightColor};
        color: ${theme.colors.primaryLightColor};
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

        &:hover {
            background-color: ${theme.colors.primaryBackgroundLightHoverColor};
        }
    `}
`

export const NavRegisterButton = styled(NavLoginButton)`
    ${({ theme }) => css`
        margin-right: 8px;
        background-color: ${theme.colors.primary};
        color: ${theme.colors.navbuttonColor};
        
        &:hover {
            background-color: ${theme.colors.primaryBackgroundDarkHoverColor};
        }
    `}
`