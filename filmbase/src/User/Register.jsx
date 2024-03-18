import { Message } from "./Message";

export const Register = ({
    setIsRegisterClicked,
    isRegisterClicked,
    setClickContext,
    setUserName,
    setEmail,
    setPassword,
    createUser,
    loading,
    isRegister,
}) => {
    return (
        <div className="user-register">
            {isRegister ? (
                <div>
                    <Message
                        color={"green"}
                        eventType={"Success"}
                        message={
                            "Welcome to our movie buff community, you have been successfully registered"
                        }
                        icon={"fa-solid fa-face-smile-beam"}
                    />
                    <p
                        onClick={() => setIsRegisterClicked(false)}
                        className="click-register"
                    >
                        click to Log In
                    </p>
                </div>
            ) : (
                <>
                    <div className="user-register-info">
                        <h2>
                            Join us!{" "}
                            <i className="fa-regular fa-address-card"></i>
                        </h2>
                        <p>
                            Welcome to our FilmBase website! 🎬 Search, explore,
                            and discover a huge collection of films. Register
                            now to unlock extensive database, explore detailed
                            movie information, rate your favorites, and curate
                            your own list of beloved films. Join us and
                            contribute to our film freaks community
                        </p>
                    </div>
                    {loading ? (
                        <div className="loading-spinner"></div>
                    ) : (
                        <form
                            className="user-register-input-box"
                            onSubmit={createUser}
                        >
                            <h2>Registration</h2>
                            <input
                                type="text"
                                placeholder="user name"
                                onChange={(e) => setUserName(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="e-mail"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <p
                                onClick={() =>
                                    setIsRegisterClicked(!isRegisterClicked)
                                }
                                className="click-register"
                            >
                                Or Log in!
                            </p>
                            <button type="submit" className="btn">
                                Submit
                            </button>
                            <i
                                className="fa-solid fa-house-chimney"
                                onClick={setClickContext}
                                style={{ marginTop: "10px" }}
                            ></i>
                        </form>
                    )}
                </>
            )}
        </div>
    );
};
