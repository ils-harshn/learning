import { css, styled } from "styled-components";
import { Link } from "react-router-dom";

export const FormContainer = styled.div`
    ${({ theme }) => css`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: calc(100vh - ${theme.dimensions.navbarHeight} - 3px);
    `}
`

export const FormTitle = styled.div`
    font-size: 20px;
    margin-bottom: 10px;
    font-weight: 600;
`

export const Form = styled.form`
    ${({ width, theme }) => css`
        width: ${width || "234px"};
        height: fit-content;
        padding: 24px;
        border-radius: 7px;
        background-color: ${ theme.colors.formBackground };
        box-shadow: rgba(0, 0, 0, 0.05) 0px 10px 24px 0px, rgba(0, 0, 0, 0.05) 0px 20px 48px 0px, rgba(0, 0, 0, 0.1) 0px 1px 4px 0px;

        @media screen and (max-width: 311px) {
            width: 60%;
        }
    `}
`

export const FormGroup = styled.div`
    margin-bottom: 12px;
`

export const FormGroupLabel = styled.label`
    display: block;
    font-weight: 600;
    font-size: 15px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin-bottom: 4px;

    @media screen and (max-width: 311px) {
        font-size: 12px;
    }
`

export const FormGroupTextArea = styled.textarea`
    ${({ theme }) => css`
        outline: none;
        border: 1px solid ${theme.colors.inputBorder};
        height: 200px;
        min-height: 200px;
        border-radius: 3px;
        padding: 8px 9px 8px 9px;
        width: calc(100% - 18px);
        resize: vertical;
    `}
`

export const FormGroupLabelDescription = styled.div`
    font-size: 12px;
    margin-bottom: 4px;
`

export const FormGroupInput = styled.input`
    ${({ theme }) => css`
        outline: none;
        border: 1px solid ${theme.colors.inputBorder};
        height: 16px;
        border-radius: 3px;
        padding: 8px 9px 8px 9px;
        width: calc(100% - 18px);
    `}
`
export const FormGroupError = styled.div`
    font-size: 12px;
    color: red;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

    @media screen and (max-width: 311px) {
        font-size: 12px;
    }
`

export const FormLabelGroup = styled.div`
    display: flex;
    justify-content: space-between;
`

export const FormLink = styled(Link)`
    ${({ theme }) => css`
        text-decoration: none;
        color: ${theme.colors.primary};
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 13px;
        line-height: 18px;

        @media screen and (max-width: 311px) {
            font-size: 10px;
        }

        &:focus {
            outline: none;
            color: ${theme.colors.linkDark};
        }
    `}
`

export const FormSubmitButton = styled.button`
    ${({ theme }) => css`
        outline: none;
        border: none;
        width: 100%;
        height: 38px;
        background-color: ${theme.colors.buttonPrimary};
        border-radius: 3px;
        font-size: 13px;
        color: ${theme.colors.formSubmitButtonColor};
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

        display: flex;
        justify-content: center;
        align-items: center;
        
        &:hover {
            background-color: ${theme.colors.buttonHover}
        }

        &:disabled {
            background-color: ${ theme.colors.primaryLightColor };
        }
    `}
`

export const RememberMeGroup = styled.div`
    margin-bottom: 12px;
    display: flex;
    align-items: center;
`

export const RememberMeCheckbox = styled.input.attrs({ type: 'checkbox' })``

export const RememberMeLabel = styled.div`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 12px;

    @media screen and (max-width: 311px) {
        font-size: 12px;
    }
`

export const ButtonLoaderIcon = styled.div`
    border: 2px solid #f3f3f3;
    border-radius: 50%;
    border-top: 2px solid #3498db;
    width: 10px;
    height: 10px;
    -webkit-animation: spin 300ms linear infinite; /* Safari */
    animation: spin 300ms linear infinite;

    @-webkit-keyframes spin {
        0% { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`

export const FormFooter = styled.div`
    ${({ theme }) => css`
        width: 234px;
        height: 78px;
        margin-top: 10px;

        p {
            font-size: 13px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            text-align: center;

            a {
                text-decoration: none;
                color: ${theme.colors.primary};
            }
        }
    `}
`