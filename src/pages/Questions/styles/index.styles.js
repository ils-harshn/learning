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

export const QuestionContainer = styled.div`
    ${({ theme }) => css`
        border-bottom: 1px solid ${theme.colors.questionBorderSeperator};
        height: fit-content;
        padding: 16px;
        display: grid;
        grid-template-columns: 108px 1fr;
        
        @media screen and (max-width: 981px) {
            grid-template-columns: 1fr;
        }
    `}
`

export const QuestionSummary = styled.div`
    width: 108px;
    text-align: right;
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    @media screen and (max-width: 981px) {
        width: 100%;
        flex-direction: row;
        align-items: center;
        padding-left: 10px;
        margin-bottom: 10px;

        div {
            margin-right: 8px;
        }

        div:nth-child(2) {
            margin-right: 4px;
        }
    }

    > div {
        margin-top: 6px;
    }
`

export const QuestionDetails = styled.div`
    flex-grow: 1;
    margin-left: 12px;

    div:first-child {
        a {
            color: hsl(206,100%,40%);
            text-decoration: none;
    
            &:hover {
                color: #0a95ff;
            }
        }
    }
`

export const QuestionDescription = styled.div`
    font-size: 13px;
    color: #3b4045;
`

export const QuestionSummaryVotes = styled.div`
    font-size: 13px;
`

export const QuestionSummaryAnswers = styled.div`
    background-color: #2f6f44;
    color: white;
    width: fit-content;
    padding: 2px 4px 2px 4px;
    font-size: 13px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;

    div:first-child span {
        display: flex;
        align-items: center;
        font-size: 20px;
    }

    div:nth-child(2) {
        margin-right: 4px;
    }
`

export const QuestionSummaryAnswersNotAccepted = styled(QuestionSummaryAnswers)`
    background-color: white;
    color: #2f6f44;
    border: 1px solid #2f6f44;

    div:first-child {
        margin-right: 4px;
    }

    div:nth-child(2) {
        margin-right: 0px;
    }
`


export const QuestionSummaryViews = styled.div`
    color: #922024;
    font-size: 13px;
    display: flex;

    div:first-child {
        margin-right: 4px;
    }
`

export const QuestionTagsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 8px;
`

export const QuestionTag = styled.div`
    background-color: #E1ECF4;
    color: #69B0E3;
    font-size: 12px;
    padding: 5px 6px 5px 6px;
    margin-right: 6px;
    margin-bottom: 6px;
    border-radius: 3px;
    line-height: 12px;

    &:hover {
        background-color: #d0e3f1;
    }
`

export const QuestionSummaryAnswerZero = styled(QuestionSummaryViews)`
    color: black;
`