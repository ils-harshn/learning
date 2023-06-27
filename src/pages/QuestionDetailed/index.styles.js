import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { QuestionDescription as  Description} from "../Questions/styles/index.styles";
import { MiddleBlock } from "../../styles/containers/containers.styles";

export const QuestionContainer = styled(MiddleBlock)`
`

export const QuestionTitle = styled(Link)`
    color: #3b4045;
    text-decoration: none;
    font-size: 27px;
`

export const QuestionTimeline = styled.div`
    display: flex;
    margin-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e3e6e8;
    margin-bottom: 20px;
`

export const QuestionTimelineDetail = styled.div`
    margin-right: 10px;
    font-size: 13px;

    span:first-child {
        color: #6a737c;
        margin-right: 4px;
    }
`

export const QuestionDetailContainer = styled.div`
    display: flex;
    width: 694px;

    text-overflow: ellipsis;
    word-wrap: break-word;
    overflow: hidden;

    @media screen and (max-width: 1280px) {
        width: 54vw;
    }

    @media screen and (max-width: 1240px) {
        width: 52vw;
    }

    @media screen and (max-width: 1120px) {
        width: 48vw;
    }

    @media screen and (max-width: 981px) {
        width: 82vw;
    }

    @media screen and (max-width: 821px) {
        width: 94vw;
    }

    @media screen and (max-width: 700px) {
        width: 92vw;
    }

    @media screen and (max-width: 440px) {
        width: 86vw;
    }
`

export const QuestionOptions = styled.div`
    width: 56px;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    font-size: 14px;

    div {
        text-align: center;
        border: 1px solid #d6d9dc;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
        align-items: center;
        border-radius: 50%;
        cursor: pointer;

        &:hover {
            background-color: #fce3cf;
        }

        span {
            font-size: 18px;
        }
    }

    div:nth-child(2) {
        border: none;
        text-align: center;
        margin-left: 0.8px;

        &:hover {
            background-color: white;
        }
    }
`

export const QuestionDescription = styled(Description)`
    flex-grow: 1;
    padding-left: 12px; 
    text-overflow: ellipsis;
    word-wrap: break-word;
    overflow: hidden;
`