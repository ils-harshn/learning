import { createGlobalStyle, css } from "styled-components";

const GlobalStyles = createGlobalStyle`
  ${({ theme }) => css`
        body {
          margin: 0;
          padding: 0;
          background-color: ${theme.colors.bodyBackground};
          color: ${theme.colors.bodyFontColor};
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        ::-webkit-scrollbar {
          width: 6px;
        }

        /* Track */
        ::-webkit-scrollbar-track {
          background: #fff1d9; 
        }
        
        /* Handle */
        ::-webkit-scrollbar-thumb {
          background: #ffbe47;
          border-radius: 7px;
        }

        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
          background: #ffa500; 
        }
    `}
`

export default GlobalStyles