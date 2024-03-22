// AuthContext.js
import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("jwtToken"));
    const [loggedInUser, setLoggedInUser] = useState([]); // Add loggedInUser state

    const login = () => {
        setIsLoggedIn(true);
    };

    const logout = () => {
        Cookies.remove("jwtToken", { httpOnly: true, secure: true });
        setIsLoggedIn(false);
        setLoggedInUser([]); // Clear loggedInUser when logging out
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                login,
                logout,
                loggedInUser, // Include loggedInUser in the context value
                setLoggedInUser, // Include setLoggedInUser in the context value
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
