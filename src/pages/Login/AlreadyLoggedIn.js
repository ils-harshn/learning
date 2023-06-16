import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { initiateLogoutAction } from "../../store/actions/authActions/loginActions"


const AlreadyLoggedIn = ({ user }) => {
    const logoutReducerData = useSelector(reducers => reducers.loginReducer)
    const dispatch = useDispatch()

    return (
        <div>
            <h3>You already logged in as { user.email }</h3>
            <Link to={"/"}>Go to home page</Link>
            <button onClick={() => dispatch(initiateLogoutAction())}>{logoutReducerData.error ? logoutReducerData.error: "Sign Out"}</button>
        </div>
    )
}

export default AlreadyLoggedIn