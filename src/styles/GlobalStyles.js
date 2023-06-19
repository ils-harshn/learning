import { createGlobalStyle, css } from "styled-components";

const GlobalStyles = createGlobalStyle`
  ${({ theme }) => css`
      
      body {
        margin: 0;
        padding: 0;
        background-color: ${theme.colors.bodyBackground};
        color: ${theme.colors.bodyFontColor};
      }
      
    `}
`

export default GlobalStyles