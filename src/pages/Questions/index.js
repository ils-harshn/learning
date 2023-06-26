import { useNavigate } from "react-router-dom"
import { MiddleBlock, RightBlock, RightSection } from "../../styles/containers/containers.styles"
import { PrimaryButton } from "../../styles/notifiers/info.styles"
import { Header, Title } from "./index.styles"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { initiateGetPublicQuestionsAction } from "../../store/actions/questionActions/getPublicQuestionsActions"

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
                    getPublicQuestionsReducerData.loading ?
                        <div>
                            loading
                        </div> :
                        <div>
                            loaded
                            {console.log(getPublicQuestionsReducerData.success)}

                            {
                                getPublicQuestionsReducerData.nextDataAvialable ?
                                <button onClick={() => dispatch(initiateGetPublicQuestionsAction(getPublicQuestionsReducerData.lastDocRef))}>Load more</button>: <></>
                            }

                        </div>
                }
            </MiddleBlock>
            <RightBlock>
            </RightBlock>
        </RightSection>
    )
}

export default Questions