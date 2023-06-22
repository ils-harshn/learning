import { useNavigate } from "react-router-dom"
import { MiddleBlock, RightBlock, RightSection } from "../../styles/containers/containers.styles"
import { PrimaryButton } from "../../styles/notifiers/info.styles"
import { Header, Title } from "./index.styles"

const Questions = () => {
    const navigate = useNavigate()

    return (
        <RightSection>
            <MiddleBlock>
                <Header>
                    <Title>All Questions</Title>
                    <PrimaryButton onClick={() => navigate("/questions/ask")}>Ask Question</PrimaryButton>
                </Header>
            </MiddleBlock>
            <RightBlock>
            </RightBlock>
        </RightSection>
    )
}

export default Questions