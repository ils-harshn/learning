import { useState } from "react"
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth"
import { auth } from "../../firebase"
import RegistrationForm from "../../components/RegistrationForm"

const Registration = () => {
    // const [sending, setSending] = useState(false)      

    // const handleRegistration = async () => {
    //     setSending(true)
    //     await createUserWithEmailAndPassword(auth, "harshverma790932611@gmail.com", "testing321")
    //         .then((userCredential) => {
    //             const user = userCredential.user;
    //             const actionCodeSettings = {
    //                 url: "http://localhost:3000/accounts/", // Replace with your app's URL
    //                 handleCodeInApp: false,
    //             };
    //             sendEmailVerification(user, actionCodeSettings)
    //         })
    //         .catch((error) => {
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //             console.log(error)
    //         });
    //     setSending(false)
    // }

    return (
        <>
            <RegistrationForm />
        </>
    )
}

export default Registration