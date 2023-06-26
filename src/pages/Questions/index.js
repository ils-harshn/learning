import { Link, useNavigate } from "react-router-dom"
import { MiddleBlock, RightBlock, RightSection } from "../../styles/containers/containers.styles"
import { PrimaryButton } from "../../styles/notifiers/info.styles"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { initiateGetNextPublicQuestionsAction, initiateGetPublicQuestionsAction } from "../../store/actions/questionActions/getPublicQuestionsActions"
import { BasicLoader, BasicLoaderContainer } from "../../styles/loaders/loaders.styles"
import { Header, QuestionContainer, QuestionDescription, QuestionDetails, QuestionSummary, QuestionSummaryAnswerZero, QuestionSummaryAnswers, QuestionSummaryAnswersNotAccepted, QuestionSummaryViews, QuestionSummaryVotes, QuestionTag, QuestionTagsContainer, Title } from "./styles/index.styles"
import { ModelContainer, ModelInfo } from "../../styles/models/models.styles"

const AnswerStatus = ({ item }) => {
    if (item.status === "accepted")
        return (
            <QuestionSummaryAnswers>
                <span class="material-symbols-outlined">
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
                    <Link>{item.title}</Link>
                </div>
                <QuestionDescription>
                    {item.description}
                </QuestionDescription>
                <QuestionTagsContainer>
                    <QuestionTag>java</QuestionTag>
                    <QuestionTag>java</QuestionTag>
                    <QuestionTag>java</QuestionTag>
                    <QuestionTag>java</QuestionTag>
                    <QuestionTag>java</QuestionTag>
                    <QuestionTag>java</QuestionTag>
                </QuestionTagsContainer>
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
                    getPublicQuestionsReducerData.success.map(item => (
                        <Question item={item} key={item.id} />
                    ))
                }

                {
                    (getPublicQuestionsReducerData.nextDataAvialable && !getPublicQuestionsReducerData.loading) ?
                        <BasicLoaderContainer>
                            <PrimaryButton
                                onClick={() => dispatch(initiateGetNextPublicQuestionsAction(getPublicQuestionsReducerData.lastDocRef))}>Load more</PrimaryButton>
                        </BasicLoaderContainer> : <></>
                }

                {
                    getPublicQuestionsReducerData.loading && <BasicLoaderContainer><BasicLoader /></BasicLoaderContainer>
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