import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import AlreadyLoggedIn from './AlreadyLoggedIn';
import LoginForm from './LoginForm';


const Login = () => {
    const [user, loading, error] = useAuthState(auth)

    if (loading) return <p>Loading</p>

    if (error) return <p>Error Please Reload</p>

    if (user) return <AlreadyLoggedIn user={user} />

    return (
        <>
            <LoginForm />
        </>
    )
}

export default Login