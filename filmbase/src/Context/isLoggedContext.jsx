// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { isValidToken } from "../helpers/IsTokenValid";
import { api } from "../utils/apiInstance";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const token = Cookies.get("jwtToken");
        console.log("logged in");

        return !!token && isValidToken(token);
    });
    const [loggedInUser, setLoggedInUser] = useState([]);

    useEffect(() => {
        const token = Cookies.get("jwtToken");
        if (isLoggedIn && token && isValidToken(token)) {
            const expirationDate = new Date(token).getTime();
            const currentDate = new Date().getTime();

            if (expirationDate < currentDate) {
                // Token has expired, logout the user
                logout();
            } else {
                // Token is still valid, get user info
                getUserInfo(token);
            }
        }
    }, [isLoggedIn, Cookies, isValidToken]);

    const login = (token) => {
        // Set the expiration to 45 minutes from now
        const expirationDate = new Date(new Date().getTime() + 45 * 60 * 1000);
        Cookies.set("jwtToken", token, { expires: expirationDate });
        setIsLoggedIn(true);
    };
    const logout = () => {
        // Remove JWT token from cookies
        Cookies.remove("jwtToken");
        setIsLoggedIn(false);
        setLoggedInUser(null);
    };
    const getUserInfo = async (token) => {
        try {
            const response = await fetch(`${api}/api/users/info`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const userInfo = await response.json();
            setLoggedInUser(userInfo);
        } catch (err) {
            console.error("Error retrieving user info:", err.message);

            setLoggedInUser(null);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                login,
                logout,
                loggedInUser,
                setLoggedInUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
