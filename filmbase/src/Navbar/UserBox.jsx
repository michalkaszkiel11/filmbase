import { useClickContext } from "../Context/isClickedContext";
import { useAuth } from "../Context/isLoggedContext";
import { User } from "../User/User";

export const UserBox = ({
    watched,
    isDashboardOpen,
    handleDashboard,
    setShowCollection,
    setMovies,
    loggedInUser,
}) => {
    const { setClickContext, isLogClicked } = useClickContext();
    const { isLoggedIn, logout } = useAuth();

    const userName = loggedInUser?.userName;
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
                            {userName ? userName : "Login"}
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
                <User
                    watched={watched}
                    loggedInUser={loggedInUser}
                    userName={userName}
                    logout={logout}
                    handleDashboard={handleDashboard}
                    isDashboardOpen={isDashboardOpen}
                    isLoggedIn={isLoggedIn}
                    setShowCollection={setShowCollection}
                    setMovies={setMovies}
                />
            ) : (
                ""
            )}
        </div>
    );
};
