import {  css, styled } from "styled-components";

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
`

export const SideBarContainer = styled.div`
    ${({ theme }) => css`
        border-right: 1px solid ${theme.colors.borderSeperator};
        padding-top: 25px;
    `}
`

export const RightSection = styled.div`
    display: grid;
    grid-template-columns: 1fr 300px;
    overflow-y: auto;
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */
    &::-webkit-scrollbar { 
        display: none;  /* Safari and Chrome */
    }
`

export const MiddleBlock = styled.div`
    padding: 24px 24px 24px 24px;
    
`

export const RightBlock = styled.div`
    padding: 24px 24px 24px 24px;
    
`
