import { api } from "../utils/apiInstance";

export const deleteMovie = async (email, watch, setIsWatchedUpadted) => {
    const payload = {
        email: email,
        _id: watch._id,
    };
    try {
        setIsWatchedUpadted(true);
        const response = await fetch(`${api}/api/users/film/delete-film`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        if (response.status === 404) {
            throw new Error("user not found");
        }
        if (response.status === 500) {
            throw new Error("Network error");
        }
        const data = response.json();
        console.log(data);
        setIsWatchedUpadted(false);
    } catch (err) {
        console.log("Error updating user rating:", err);
        setIsWatchedUpadted(false);
    } finally {
        setIsWatchedUpadted(false);
    }
};
