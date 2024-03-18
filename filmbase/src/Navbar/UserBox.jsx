import { useClickContext } from "../Context/isClickedContext";
import userpng from "../images/user.png";
import { User } from "../User/User";
export const UserBox = ({ isLoggedIn, watched }) => {
    const { setClickContext } = useClickContext();
    return (
        <div className="user-box">
            <div className="user-icons" onClick={setClickContext}>
                <div className="user-icon-name">
                    {isLoggedIn ? "username" : "Log In "}
                </div>
                {isLoggedIn ? (
                    <img src={userpng} alt="" className="user-icon" />
                ) : (
                    <i className="fa-solid fa-right-to-bracket"></i>
                )}
            </div>
            <User watched={watched} />
        </div>
    );
};
