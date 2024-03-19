import { useState } from "react";
import { Register } from "./Register";
import { useClickContext } from "../Context/isClickedContext";
import { useAuth } from "../Context/isLoggedContext";
import Cookies from "js-cookie";
import { Message } from "./Message";

export const Login = ({
    setUserName,
    setEmail,
    setPassword,
    createUser,
    loading,
    isRegister,
    setLoading,
}) => {
    const [isRegisterClicked, setIsRegisterClicked] = useState(false);
    const { setClickContext } = useClickContext();
    const [loginEmail, setLoginEmail] = useState("");
    // const [showPassword, setShowPassword] = useState(false);
    const [loginPassword, setLoginPassword] = useState("");
    const [error, setError] = useState("");
    const { login, setLoggedInUser, isLoggedIn } = useAuth();

    const handleLogIn = async (e) => {
        e.preventDefault();
        const user = {
            email: loginEmail,
            password: loginPassword,
        };
        try {
            setLoading(true);
            const response = await fetch(
                "http://localhost:10000/api/users/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(user),
                }
            );

            if (response.status === 200) {
                const token = response.data.token;
                Cookies.set("jwtToken", token);
                login();
                setLoggedInUser(user.name);
            } else {
                setError("Login failed");
            }
        } catch (err) {
            let errorMessage = "Failed to login. Please try again.";
            if (err.response && err.response.data) {
                if (err.response.data.errors) {
                    const formattedErrors = err.response.data.errors.map(
                        (error) => error.msg
                    );
                    errorMessage = formattedErrors.join("\n");
                } else if (err.response.data.message) {
                    errorMessage = err.response.data.message;
                }
            }
            window.alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="user-login">
            {isLoggedIn ? (
                <Message
                    color={"green"}
                    eventType={"Success"}
                    message={"Welcome back"}
                    icon={"fa-solid fa-face-smile-beam"}
                />
            ) : (
                <>
                    {loading ? (
                        <div className="loading-spinner"></div>
                    ) : (
                        <>
                            {!isRegisterClicked ? (
                                <form
                                    className="user-login-input-box"
                                    onSubmit={handleLogIn}
                                >
                                    <h2>Login</h2>
                                    <input
                                        type="e-mail"
                                        placeholder="e-mail address"
                                        onChange={(e) =>
                                            setLoginEmail(e.target.value)
                                        }
                                    />
                                    <input
                                        type="password"
                                        placeholder="password"
                                        onChange={(e) =>
                                            setLoginPassword(e.target.value)
                                        }
                                        style={{ marginBottom: "10px" }}
                                    />
                                    {isRegister ? (
                                        ""
                                    ) : (
                                        <p
                                            onClick={() =>
                                                setIsRegisterClicked(
                                                    !isRegisterClicked
                                                )
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
                </>
            )}
        </div>
    );
};
