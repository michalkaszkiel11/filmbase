// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { isValidToken } from "../helpers/IsTokenValid";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const token = Cookies.get("jwtToken");
        return !!token && isValidToken(token);
    });
    const [loggedInUser, setLoggedInUser] = useState([]);

    useEffect(() => {
        const token = Cookies.get("jwtToken");
        if (isLoggedIn && token && isValidToken(token)) {
            getUserInfo(token);
        }
    }, []);

    const login = (token) => {
        Cookies.set("jwtToken", token, { expires: 0.03125 });
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
            const response = await fetch(
                "http://localhost:10000/api/users/info",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
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
