export const Register = ({
    setIsRegisterClicked,
    isRegisterClicked,
    setClickContext,
}) => {
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
                <i
                    className="fa-solid fa-house-chimney"
                    onClick={setClickContext}
                ></i>
            </div>
        </div>
    );
};
