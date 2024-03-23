import { useState } from "react";
import { Register } from "./Register";
import { useClickContext } from "../Context/isClickedContext";
import { useAuth } from "../Context/isLoggedContext";
import Cookies from "js-cookie";

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

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            const token = data.token;
            if (!token) {
                throw new Error("Token not found in response");
            }

            Cookies.set("jwtToken", token);
            login();
            setLoggedInUser(data);
            setClickContext();
        } catch (err) {
            console.error("Error logging in:", err.message);
            window.alert("Failed to login. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="user-login">
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
        </div>
    );
};
