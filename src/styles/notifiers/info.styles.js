import { css, styled } from "styled-components";
import { FormSubmitButton } from "../../pages/Login/styles/loginForm.styles";

export const FullScreenInfo = styled.div`
    ${({ theme }) => css`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: calc(100vh - ${theme.dimensions.navbarHeight} - 3px);
    `}
`

export const InfoContainer = styled.div`
    ${({ theme }) => css`
        overflow-x: auto;
        width: 80%;
        max-width: fit-content;
        padding: 24px;
        border-radius: 7px;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 10px 24px 0px, rgba(0, 0, 0, 0.05) 0px 20px 48px 0px, rgba(0, 0, 0, 0.1) 0px 1px 4px 0px;
        background-color: ${theme.colors.infoContainerBackground};
    `}
`

export const SuccessMessage = styled.p`
    ${({ theme }) => css`
        font-size: 12px;
        color: ${theme.colors.primary};
    `}
`

export const PrimaryButton = styled(FormSubmitButton)`
        width: fit-content;
        min-width: 100px;
`