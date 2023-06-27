import { useParams } from "react-router-dom"
import { BasicLoader, BasicLoaderContainer } from "../../styles/loaders/loaders.styles";
import { MiddleBlock, RightBlock, RightSection } from "../../styles/containers/containers.styles";
import { ModelContainer, ModelInfo } from "../../styles/models/models.styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initiateGetPublicQuestionAction } from "../../store/actions/questionActions/getPublicQuestionActions";
import { QuestionDescription, QuestionDetailContainer, QuestionOptions, QuestionTimeline, QuestionTimelineDetail, QuestionTitle } from "./index.styles";


const QuestionVoter = ({ data }) => {
    return (
        <QuestionOptions>
            <div>
                <span className="material-symbols-outlined">
                    arrow_upward
                </span>
            </div>
            <div>
                {data.votes}
            </div>
            <div>
                <span className="material-symbols-outlined">
                    arrow_downward
                </span>
            </div>
        </QuestionOptions>
    )
}

const Question = ({ data }) => {
    return (<>
        <QuestionTitle to={`/questions/${data.id}`}>{data.title}</QuestionTitle>
        <QuestionTimeline>
            <QuestionTimelineDetail>
                <span>Asked</span>
                <span>today</span>
            </QuestionTimelineDetail>
            <QuestionTimelineDetail>
                <span>Modified</span>
                <span>today</span>
            </QuestionTimelineDetail>
            <QuestionTimelineDetail>
                <span>Viewed</span>
                <span>8 times</span>
            </QuestionTimelineDetail>
        </QuestionTimeline>

        <QuestionDetailContainer>
            <QuestionVoter data={data}/>
            <QuestionDescription>
                {data.description}
            </QuestionDescription>
        </QuestionDetailContainer>
    </>
    )
}

const QuestionDetailed = () => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const getPublicQuestionData = useSelector(reducers => reducers.getPublicQuestionReducer)

    useEffect(() => {
        dispatch(initiateGetPublicQuestionAction(id))
    }, [])

    return (
        <RightSection>
            <MiddleBlock>
                {
                    getPublicQuestionData.loading ?
                        <BasicLoaderContainer height={"80%"}>
                            <BasicLoader />
                        </BasicLoaderContainer> :

                        getPublicQuestionData.error ?
                            <p>{getPublicQuestionData.error}</p> :
                            <Question data={getPublicQuestionData.success} />
                }
            </MiddleBlock>
            <RightBlock>
                <ModelContainer>
                    <ModelInfo>
                        <h4>The Overflow Blog</h4>
                        <p>The hardest part of building software is not coding, it’s requirements</p>
                        <p>The cofounder of Chef is cooking up a less painful DevOps (Ep. 584)</p>
                        <h4>Featured on Meta</h4>
                        <p>Statement from SO: June 5, 2023 Moderator Action</p>
                        <p>Starting the Prompt Design Site: A New Home in our Stack Exchange Neighborhood</p>
                        <p>Does the policy change for AI-generated content affect users who (want to)...</p>
                        <p>Temporary policy: Generative AI (e.g., ChatGPT) is banned</p>
                        <h4>Hot Meta Posts</h4>
                        <p>Burninate [contentview]</p>
                    </ModelInfo>
                </ModelContainer>
            </RightBlock>
        </RightSection>
    )
}

export default QuestionDetailed