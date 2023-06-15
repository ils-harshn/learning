import { signOut } from "firebase/auth"
import { auth } from "../../firebase"

const Home = () => {
    return (
        <>
            <h3>Home</h3>
            <button onClick={() => {
                signOut(auth)
            }}>Sign Our</button>
        </>
    )
}

export default Home