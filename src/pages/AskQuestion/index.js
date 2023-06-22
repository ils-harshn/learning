import { MiddleBlock, RightBlock, RightSection } from "../../styles/containers/containers.styles"
import { Form, FormGroup, FormGroupError, FormGroupInput, FormGroupLabel, FormGroupLabelDescription, FormGroupTextArea, FormSubmitButton } from "../Login/styles/loginForm.styles"
import { Header, Title } from "../Questions/index.styles"

const QuestionForm = () => {
    return <Form width="100%">
        <FormGroup>
            <FormGroupLabel>Title</FormGroupLabel>
            <FormGroupLabelDescription>Be specific and imagine you’re asking a question to another person</FormGroupLabelDescription>
            <FormGroupInput placeholder="e.g. Is there an R function for finding the index of an element in a vector?"/>
            <FormGroupError>*Required</FormGroupError>
        </FormGroup>
        <FormGroup>
            <FormGroupLabel>Body</FormGroupLabel>
            <FormGroupLabelDescription>Include all the information someone would need to answer your question</FormGroupLabelDescription>
            <FormGroupTextArea></FormGroupTextArea>
            <FormGroupError>*Required</FormGroupError>
        </FormGroup>
        <FormGroup>
            <FormGroupLabel>Tags</FormGroupLabel>
            <FormGroupLabelDescription>Add up to 5 tags to describe what your question is about</FormGroupLabelDescription>
            <FormGroupInput placeholder="e.g. (swift spring postgresql)"></FormGroupInput>
            <FormGroupError>*Required</FormGroupError>
        </FormGroup>
        <FormSubmitButton>Post Your Question</FormSubmitButton>
    </Form>
}


const AskQuestion = () => {
    return (
        <RightSection>
            <MiddleBlock>
                <Header marginBottom={"20px"}>
                    <Title weight={600}>Ask a public question</Title>
                </Header>
                <QuestionForm />
            </MiddleBlock>
            <RightBlock>
                <h3>Write suitable Question</h3>
            </RightBlock>
        </RightSection>
    )
}

export default AskQuestion