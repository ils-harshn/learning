import { useDispatch, useSelector } from "react-redux"
import { initiateLogoutAction } from "../../store/actions/authActions/loginActions"

const Home = () => {
    const logoutReducerData = useSelector(reducers => reducers.loginReducer)
    const dispatch = useDispatch()

    return (
        <>
            <h3>Home</h3>
            <button onClick={() => dispatch(initiateLogoutAction())}>{logoutReducerData.error ? logoutReducerData.error: "Sign Out"}</button>
        </>
    )
}

export default Home