import { useState } from "react";
import { WatchedSummary } from "./Watched/WatchedSummary";
import { Settings } from "./Settings";
export const User = ({ watched }) => {
    const [openSummary, setOpenSummary] = useState(false);
    const [openSettings, setOpenSettings] = useState(false);

    return (
        <div className="user-info">
            <div className="user-info-username">
                <h3>User</h3>
            </div>
            <div className="user-info-box">
                <h4
                    onClick={() => {
                        setOpenSettings(false);
                        setOpenSummary(true);
                    }}
                >
                    Watched{" "}
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
                {openSummary && <WatchedSummary watched={watched} />}
                {openSettings && <Settings />}
            </div>
        </div>
    );
};
