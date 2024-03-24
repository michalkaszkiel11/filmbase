import { jwtDecode } from "jwt-decode";

export const isValidToken = (token) => {
    try {
        const decodedToken = jwtDecode(token);
        return decodedToken.exp * 1000 > Date.now();
    } catch (error) {
        return false;
    }
};
