import { css, styled } from "styled-components";

export const MainContainer = styled.div`
    ${({ theme }) => css`
        display: flex;
        justify-content: center;
        height: calc(100vh - ${theme.dimensions.navbarHeight} - 3px);
        background-color: ${theme.colors.mainContainer};
    `}
`


export const MainLayout = styled.div`
    width: 100%;
    max-width: 1264px;
    display: grid;
    grid-template-columns: 0.15fr 1fr;
    @media screen and (max-width: 820px) {
        grid-template-columns: 1fr;
    }
`

export const SideBarContainer = styled.div`
    ${({ theme }) => css`
        border-right: 1px solid ${theme.colors.borderSeperator};
        padding-top: 25px;
        display: block;

        @media screen and (min-width: 821px) {
            display: block !important;
        }

        @media screen and (max-width: 820px) {
            display: none;
            position: absolute;
            z-index: 1;
            background-color: ${theme.colors.formBackground};
            width: 50%;
            border-bottom: 1px solid ${theme.colors.borderSeperator};
        }
    `}
`

export const RightSection = styled.div`
    display: grid;
    grid-template-columns: 1fr 380px;
    overflow-y: auto;
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */
    &::-webkit-scrollbar { 
        display: none;  /* Safari and Chrome */
    }

    @media screen and (max-width: 980px) {
        grid-template-columns: 1fr;
    }
`

export const MiddleBlock = styled.div`
    padding: 24px 0 24px 24px;    

    @media screen and (max-width: 980px) {
        padding: 24px;
    }
`

export const RightBlock = styled.div`
    padding: 24px 24px 24px 0;

    @media screen and (max-width: 980px) {
        padding-top: 0;
    }
`
