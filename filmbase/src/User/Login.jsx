import { useState } from "react";
import { Register } from "./Register";

export const Login = () => {
    const [isRegisterClicked, setIsRegisterClicked] = useState(false);
    return (
        <div className="user-login">
            {!isRegisterClicked ? (
                <div className="user-login-input-box">
                    <h2>Login</h2>
                    <input type="text" placeholder="user name" />
                    <input type="password" placeholder="password" />
                    <p
                        onClick={() => setIsRegisterClicked(!isRegisterClicked)}
                        className="click-register"
                    >
                        Or join us now!
                    </p>
                </div>
            ) : (
                <Register
                    setIsRegisterClicked={setIsRegisterClicked}
                    isRegisterClicked={isRegisterClicked}
                />
            )}
        </div>
    );
};
