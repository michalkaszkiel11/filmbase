import { useClickContext } from "../Context/isClickedContext";
import { useAuth } from "../Context/isLoggedContext";
import userpng from "../images/user.png";
import { User } from "../User/User";
export const UserBox = ({ isLoggedIn, watched }) => {
    const { setClickContext } = useClickContext();
    const { loggedInUser } = useAuth();
    return (
        <div className="user-box">
            <div className="user-icons" onClick={setClickContext}>
                <div className="user-icon-name">
                    {isLoggedIn ? loggedInUser : "Log In "}
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
