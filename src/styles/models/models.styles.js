import { styled } from "styled-components";

export const ModelContainer = styled.div`
    padding: 24px 0 24px 24px;
`

export const ModelInfo = styled.div`
    background-color: white;
    /* box-shadow: rgba(0, 0, 0, 0.05) 0px 10px 24px 0px, rgba(0, 0, 0, 0.05) 0px 20px 48px 0px, rgba(0, 0, 0, 0.1) 0px 1px 4px 0px; */
    border-radius: 8px;
    border: 1px solid #e3e6e8;
    overflow: hidden;

    h4 {
        margin: 0;
        background-color: #F8F9F9;
        padding: 12px 15px 12px 15px;
        font-size: 15px;
        font-weight: normal;
        /* border-bottom: 1px solid #e3e6e8; */
        border: 1px solid #e3e6e8;
    }

    p {
        padding: 0 15px 0 15px;
        font-size: 13px;
    }
`