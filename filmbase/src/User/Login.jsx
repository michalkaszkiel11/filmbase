import { useState } from "react";
import { Register } from "./Register";
import { useClickContext } from "../Context/isClickedContext";

export const Login = () => {
    const [isRegisterClicked, setIsRegisterClicked] = useState(false);
    const { setClickContext } = useClickContext();

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
                    <i
                        className="fa-solid fa-house-chimney"
                        onClick={setClickContext}
                    ></i>
                </div>
            ) : (
                <Register
                    setIsRegisterClicked={setIsRegisterClicked}
                    isRegisterClicked={isRegisterClicked}
                    setClickContext={setClickContext}
                />
            )}
        </div>
    );
};
