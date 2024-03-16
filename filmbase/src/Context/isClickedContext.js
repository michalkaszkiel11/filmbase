import { createContext, useContext, useState } from "react";

const ClickLogin = createContext();

export const ClickLoginContext = ({ children }) => {
    const [isLogClicked, setIsLogClicked] = useState(false);
    const setClickContext = () => {
        setIsLogClicked(!isLogClicked);
        console.log(isLogClicked, "clicked");
    };
    return (
        <ClickLogin.Provider value={{ isLogClicked, setClickContext }}>
            {children}
        </ClickLogin.Provider>
    );
};

export const useClickContext = () => useContext(ClickLogin);
