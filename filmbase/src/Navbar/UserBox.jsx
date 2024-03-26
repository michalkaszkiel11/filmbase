import { useClickContext } from "../Context/isClickedContext";
import { useAuth } from "../Context/isLoggedContext";
import userpng from "../images/user.png";
import { User } from "../User/User";

export const UserBox = ({
    isLoggedIn,
    watched,
    isDashboardOpen,
    handleDashboard,
}) => {
    const { setClickContext, isLogClicked } = useClickContext();
    const { loggedInUser, logout } = useAuth();

    return (
        <div className="user-box">
            <div className="user-icons">
                <div>
                    {isLoggedIn && loggedInUser ? (
                        <div
                            className="user-icon-name"
                            onClick={
                                isLoggedIn && loggedInUser
                                    ? () => handleDashboard(!isDashboardOpen)
                                    : null
                            }
                        >
                            {loggedInUser}
                            <span>|</span>
                            <i className="fa-solid fa-chalkboard"></i>
                            <span className="chalkboard-span">|</span>
                            <i
                                onClick={(e) => {
                                    e.stopPropagation();
                                    logout();
                                }}
                                className="fa-solid fa-right-from-bracket"
                            ></i>
                        </div>
                    ) : isLogClicked ? (
                        <i
                            className="fa-solid fa-house-chimney"
                            onClick={setClickContext}
                        ></i>
                    ) : (
                        <div onClick={setClickContext}>Log In</div>
                    )}
                </div>
            </div>
            {isLoggedIn && loggedInUser && isDashboardOpen ? (
                <User watched={watched} loggedInUser={loggedInUser} />
            ) : (
                ""
            )}
        </div>
    );
};
