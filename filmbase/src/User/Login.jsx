import { useState } from "react";
import { Register } from "./Register";
import { useClickContext } from "../Context/isClickedContext";

export const Login = ({
    setUserName,
    setEmail,
    setPassword,
    createUser,
    loading,
    isRegister,
}) => {
    const [isRegisterClicked, setIsRegisterClicked] = useState(false);
    const { setClickContext } = useClickContext();

    return (
        <div className="user-login">
            {loading ? (
                <div className="loading-spinner"></div>
            ) : (
                <>
                    {!isRegisterClicked ? (
                        <form className="user-login-input-box">
                            <h2>Login</h2>
                            <input type="text" placeholder="user name" />
                            <input
                                type="password"
                                placeholder="password"
                                style={{ marginBottom: "10px" }}
                            />
                            {isRegister ? (
                                ""
                            ) : (
                                <p
                                    onClick={() =>
                                        setIsRegisterClicked(!isRegisterClicked)
                                    }
                                    className="click-register"
                                >
                                    Or join us now!
                                </p>
                            )}
                            <button type="submit" className="btn">
                                Submit
                            </button>

                            <i
                                className="fa-solid fa-house-chimney"
                                onClick={setClickContext}
                                style={{ marginTop: "10px" }}
                            ></i>
                        </form>
                    ) : (
                        <Register
                            setIsRegisterClicked={setIsRegisterClicked}
                            isRegisterClicked={isRegisterClicked}
                            setClickContext={setClickContext}
                            setUserName={setUserName}
                            setEmail={setEmail}
                            setPassword={setPassword}
                            createUser={createUser}
                            loading={loading}
                            isRegister={isRegister}
                        />
                    )}
                </>
            )}
        </div>
    );
};
