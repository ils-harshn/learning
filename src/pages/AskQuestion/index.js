import { useFormik } from "formik"
import { MiddleBlock, RightBlock, RightSection } from "../../styles/containers/containers.styles"
import { ButtonLoaderIcon, Form, FormGroup, FormGroupError, FormGroupInput, FormGroupLabel, FormGroupLabelDescription, FormGroupTextArea, FormSubmitButton } from "../Login/styles/loginForm.styles"
import { Header, Title } from "../Questions/index.styles"
import validationSchema, { initialValues } from "../../formSchemas/addQuestionFormSchema"
import { addQuestionReset, initiateAddQuestionAction } from "../../store/actions/questionActions/addQuestionActions"
import { auth } from "../../firebase"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ModelContainer, ModelInfo } from "../../styles/models/models.styles"

const QuestionForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const addQuestionReducerData = useSelector(reducers => reducers.addQuestionReducer)

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        validateOnChange: true,
        onSubmit: (values) => {
            dispatch(initiateAddQuestionAction(values.title, values.description, auth.currentUser.uid))
        }
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        formik.setFieldTouched(name, true); // Remember to mark the toched field first
        formik.setFieldValue(name, value);
    }

    useEffect(() => {
        if (addQuestionReducerData.success) {
            dispatch(addQuestionReset())
            navigate("/questions")
        }
        formik.setSubmitting(addQuestionReducerData.loading)
        formik.setFieldError("title", addQuestionReducerData.error)
    }, [addQuestionReducerData])

    return <Form width="100%" onSubmit={formik.handleSubmit}>
        <FormGroup>
            <FormGroupLabel>Title</FormGroupLabel>
            <FormGroupLabelDescription>Be specific and imagine you’re asking a question to another person</FormGroupLabelDescription>
            <FormGroupInput type="text" name="title" onChange={handleChange} value={formik.values.title} placeholder="e.g. Is there an R function for finding the index of an element in a vector?" />
            <FormGroupError className="form-error">
                {formik.touched.title ? formik.errors.title : ""}
            </FormGroupError>
        </FormGroup>
        <FormGroup>
            <FormGroupLabel>Body</FormGroupLabel>
            <FormGroupLabelDescription>Include all the information someone would need to answer your question</FormGroupLabelDescription>
            <FormGroupTextArea name="description" onChange={handleChange} value={formik.values.description}></FormGroupTextArea>
            <FormGroupError className="form-error">
                {formik.touched.description ? formik.errors.description : ""}
            </FormGroupError>
        </FormGroup>
        <FormSubmitButton type="submit" disabled={addQuestionReducerData.loading}>{addQuestionReducerData.loading ? <ButtonLoaderIcon />: "Post Your Question"}</FormSubmitButton>
    </Form>
}


const AskQuestion = () => {
    return (
        <RightSection>
            <MiddleBlock>
                <Header marginbottom={"20px"}>
                    <Title weight={600}>Ask a public question</Title>
                </Header>
                <QuestionForm />
            </MiddleBlock>
            <RightBlock>
                <ModelContainer>
                    <ModelInfo>
                        <h4>Step 1: Draft your question</h4>
                        <p>The community is here to help you with specific coding, algorithm, or language problems.</p>
                        <p>Avoid asking opinion-based questions.</p>
                        <h4>Step 2: Summarize the problem</h4>
                        <h4>Step 3: Describe what you've tried</h4>
                        <h4>Step 4: Show some code</h4>
                    </ModelInfo>
                </ModelContainer>
            </RightBlock>
        </RightSection>
    )
}

export default AskQuestion