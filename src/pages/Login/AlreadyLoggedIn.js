import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { initiateLogoutAction } from "../../store/actions/authActions/loginActions"
import { FullScreenInfo, InfoContainer, PrimaryButton } from "../../styles/notifiers/info.styles"
import { ButtonLoaderIcon } from "./styles/loginForm.styles"


const AlreadyLoggedIn = ({ user }) => {
    const logoutReducerData = useSelector(reducers => reducers.loginReducer)
    const dispatch = useDispatch()

    return (
        <FullScreenInfo>
            <InfoContainer>
                <h3>You already logged in as { user.email }</h3>
                <Link to={"/"}>Go to home page</Link>
                <br/>
                <br/>
                <PrimaryButton onClick={() => dispatch(initiateLogoutAction())}>{ logoutReducerData.loading ? <ButtonLoaderIcon />: "Sign Out"}</PrimaryButton>
            </InfoContainer>
        </FullScreenInfo>
    )
}

export default AlreadyLoggedIn