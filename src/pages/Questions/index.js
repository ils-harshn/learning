import { Link, useNavigate } from "react-router-dom"
import { MiddleBlock, RightBlock, RightSection } from "../../styles/containers/containers.styles"
import { PrimaryButton } from "../../styles/notifiers/info.styles"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { initiateGetNextPublicQuestionsAction, initiateGetPublicQuestionsAction } from "../../store/actions/questionActions/getPublicQuestionsActions"
import { BasicLoader, BasicLoaderContainer } from "../../styles/loaders/loaders.styles"
import { Header, QuestionContainer, QuestionDescription, QuestionDetails, QuestionTime, QuestionSummary, QuestionSummaryAnswerZero, QuestionSummaryAnswers, QuestionSummaryAnswersNotAccepted, QuestionSummaryViews, QuestionSummaryVotes, QuestionTag, QuestionTagsContainer, Title } from "./styles/index.styles"
import { ModelContainer, ModelInfo } from "../../styles/models/models.styles"
import { PAGE_LIMIT } from "../../firebase/requests/questions"
import { getTimeFromFBTimeStamp } from "../../helpers/string"

const AnswerStatus = ({ item }) => {
    if (item.status === "accepted")
        return (
            <QuestionSummaryAnswers>
                <span className="material-symbols-outlined">
                    done
                </span>
                <div>
                    {item.answers ? item.answers : 0}
                </div>
                <div>
                    answers
                </div>
            </QuestionSummaryAnswers>
        )
    if (item.status === "answered")
        return (
            <QuestionSummaryAnswersNotAccepted>
                <div>
                    {item.answers ? item.answers : 0}
                </div>
                <div>
                    answers
                </div>
            </QuestionSummaryAnswersNotAccepted>
        )
    return (
        <QuestionSummaryAnswerZero>
            <div>
                {item.answers ? item.answers : 0}
            </div>
            <div>
                answers
            </div>
        </QuestionSummaryAnswerZero>
    )
}

const Question = ({ item }) => {
    return (
        <QuestionContainer>
            <QuestionSummary>
                <QuestionSummaryVotes>
                    <span>{item.votes ? item.votes : 0}</span> votes</QuestionSummaryVotes>
                <AnswerStatus item={item} />
                <QuestionSummaryViews>
                    <div>
                        {item.views ? item.views : 0}
                    </div>
                    <div>
                        views
                    </div>
                </QuestionSummaryViews>
            </QuestionSummary>
            <QuestionDetails>
                <div>
                    <Link to={`/questions/${item.id}`}>{item.title}</Link>
                </div>
                <QuestionDescription>
                    {item.description.slice(0, 170)} {item.description.length > 170 && "..."}
                </QuestionDescription>
                <QuestionTagsContainer>
                    <QuestionTag>java</QuestionTag>
                    <QuestionTag>java</QuestionTag>
                    <QuestionTag>java</QuestionTag>
                    <QuestionTag>java</QuestionTag>
                    <QuestionTag>java</QuestionTag>
                    <QuestionTag>java</QuestionTag>
                </QuestionTagsContainer>
                <QuestionTime>
                        {getTimeFromFBTimeStamp(item.created_at)}
                </QuestionTime>
            </QuestionDetails>
        </QuestionContainer>
    )
}


const Questions = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const getPublicQuestionsReducerData = useSelector(reducers => reducers.getPublicQuestionsReducer)

    
    useEffect(() => {
        dispatch(initiateGetPublicQuestionsAction())
    }, [])

    return (
        <RightSection>
            <MiddleBlock>
                <Header>
                    <Title>All Questions</Title>
                    <PrimaryButton onClick={() => navigate("/questions/ask")}>Ask Question</PrimaryButton>
                </Header>

                {
                    getPublicQuestionsReducerData.loading === false && getPublicQuestionsReducerData.success.length === 0 ?
                        <p>No Questions Yet</p> : <></>
                }

                {
                    getPublicQuestionsReducerData.success.map(item => (
                        <Question item={item} key={item.id} />
                    ))
                }

                {
                    getPublicQuestionsReducerData.loading ? <BasicLoaderContainer><BasicLoader /></BasicLoaderContainer> :
                        (getPublicQuestionsReducerData.success.length >= PAGE_LIMIT && getPublicQuestionsReducerData.nextDataAvialable) ?
                            <BasicLoaderContainer>
                                <PrimaryButton
                                    onClick={() => dispatch(initiateGetNextPublicQuestionsAction(getPublicQuestionsReducerData.lastDocRef))}>Load more</PrimaryButton>
                            </BasicLoaderContainer> : <></>
                }
            </MiddleBlock>
            <RightBlock>
                <ModelContainer>
                    <ModelInfo>
                        <h4>The Overflow Blog</h4>
                        <p>Part man. Part machine. All farmer. </p>
                        <p>Throwing away the script on testing (Ep. 583)</p>
                        <h4>Featured on Meta</h4>
                        <p>Statement from SO: June 5, 2023 Moderator Action</p>
                        <p>Starting the Prompt Design Site: A New Home in our Stack Exchange Neighborhood</p>
                        <h4>Hot Meta Posts</h4>
                        <p>Edit the [nuclio] tag wiki</p>
                        <p>Burninate [contentview]</p>
                    </ModelInfo>
                </ModelContainer>
            </RightBlock>
        </RightSection>
    )
}

export default Questions