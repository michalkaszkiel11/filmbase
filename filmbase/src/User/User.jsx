import { useEffect, useRef, useState } from "react";
import { WatchedSummary } from "./Watched/WatchedSummary";
import { Settings } from "./Settings/Settings";
import { toUppercase } from "../helpers/Capitalletter";
import { Fade } from "react-awesome-reveal";

export const User = ({
    watched,
    loggedInUser,
    userName,
    logout,
    handleDashboard,
    isDashboardOpen,
    isLoggedIn,
    setShowCollection,
    setMovies,
}) => {
    const [openSummary, setOpenSummary] = useState(false);
    const [openSettings, setOpenSettings] = useState(false);
    const dashboardRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                dashboardRef.current &&
                !dashboardRef.current.contains(e.target)
            ) {
                handleDashboard(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            {handleDashboard && (
                <Fade className="user-info">
                    <>
                        <div ref={dashboardRef}>
                            <div className="user-info-username">
                                <h3>
                                    Welcome to your Dashboard:{" "}
                                    <span className="user-info-username-span">
                                        {userName && toUppercase(userName)}
                                    </span>
                                </h3>
                                <i
                                    className="fa-solid fa-xmark"
                                    onClick={
                                        isLoggedIn && loggedInUser
                                            ? () =>
                                                  handleDashboard(
                                                      !isDashboardOpen
                                                  )
                                            : null
                                    }
                                ></i>
                            </div>
                            <div className="user-info-box">
                                <h4
                                    onClick={() => {
                                        setOpenSettings(false);
                                        setOpenSummary(true);
                                    }}
                                >
                                    Movie Collection{" "}
                                    {openSummary ? (
                                        <span
                                            className="fa-solid fa-xmark"
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent event propagation
                                                setOpenSummary(false);
                                            }}
                                        ></span>
                                    ) : (
                                        ""
                                    )}
                                </h4>

                                <h4
                                    onClick={() => {
                                        setOpenSummary(false);
                                        setOpenSettings(true);
                                    }}
                                >
                                    Settings{" "}
                                    {openSettings ? (
                                        <i
                                            className="fa-solid fa-xmark"
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent event propagation
                                                setOpenSettings(false);
                                            }}
                                        ></i>
                                    ) : (
                                        ""
                                    )}
                                </h4>
                            </div>
                            <div className="user-info-option">
                                {openSummary && (
                                    <WatchedSummary
                                        watched={watched}
                                        setShowCollection={setShowCollection}
                                        setMovies={setMovies}
                                    />
                                )}
                                {openSettings && (
                                    <Settings
                                        loggedInUser={loggedInUser}
                                        logout={logout}
                                    />
                                )}
                            </div>
                        </div>
                    </>
                </Fade>
            )}
        </>
    );
};
