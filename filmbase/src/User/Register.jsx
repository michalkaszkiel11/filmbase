export const Register = ({
    setIsRegisterClicked,
    isRegisterClicked,
    setClickContext,
}) => {
    return (
        <div className="user-register">
            <div className="user-register-info">
                <h2>
                    Join us! <i className="fa-regular fa-address-card"></i>
                </h2>
                <p>
                    Welcome to our FilmBase website! 🎬 Search, explore, and
                    discover a huge collection of films. Register now to unlock
                    extensive database, explore detailed movie information, rate
                    your favorites, and curate your own list of beloved films.
                    Join us and contribute to our film freaks community
                </p>
            </div>
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
