export const Register = ({ setIsRegisterClicked, isRegisterClicked }) => {
    return (
        <div className="user-register">
            <div className="user-register-input-box">
                <h2>Registration</h2>
                <input type="text" placeholder="e-mail" />
                <input type="password" placeholder="password" />
                <p
                    onClick={() => setIsRegisterClicked(!isRegisterClicked)}
                    className="click-register"
                >
                    Or Log in!
                </p>
            </div>
        </div>
    );
};
