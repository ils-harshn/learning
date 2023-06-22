import { css, styled } from "styled-components";

export const Header = styled.div`
    ${({ marginbottom }) => css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: ${marginbottom || 0};
    `}
`

export const Title = styled.div`
    ${({ weight }) => css`
        font-size: 27px;
        font-weight: ${weight || 400};
    `}
`