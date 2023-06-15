const SuccessfullRegistration = ({ user }) => {
    return (
        <>
            <h3>Registration SuccessFull</h3>
            <p>A email have been sent to you for email verification at {user.email}</p>
            <a href="https://mail.google.com/" target="_blank" rel="noreferrer">Open your indox</a>
        </>
    )
}

export default SuccessfullRegistration