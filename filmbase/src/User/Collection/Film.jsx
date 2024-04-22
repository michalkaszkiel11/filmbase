import { useEffect, useState } from "react";
import { StarRating } from "../../StarRating";

export const Film = ({ watch, loggedInUser }) => {
    const email = loggedInUser ? loggedInUser.email : "";
    const [userRating, setUserRating] = useState(watch.userRating);
    const updateUserRating = async () => {
        const payload = {
            email: email,
            userRating: userRating,
            _id: watch._id,
        };

        try {
            const response = await fetch(
                "http://localhost:10000/api/users/film/update-user-rating",
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );
            if (!response.ok) {
                throw new Error("Network error");
            }
            const data = await response.json();
        } catch (err) {
            console.log("Error updating user rating:", err);
        }
    };
    useEffect(() => {
        updateUserRating();
    }, [userRating]);

    return (
        <div className="film-box">
            <img src={watch.Poster} alt="poster" />
            <div className="film-box-text">
                <h3>{watch.Title}</h3>
                <p>{watch.Year}</p>
            </div>
            <div className="film-imdb-rating-box">
                <p>imdb rating: </p>
                <StarRating
                    rating={watch.imdbRating}
                    maxRating={10}
                    disabled={true}
                    size={18}
                />
            </div>
            <div className="film-imdb-rating-user">
                <p>your rating</p>
                <StarRating
                    rating={watch.userRating}
                    maxRating={10}
                    disabled={false}
                    size={18}
                    setRating={setUserRating}
                />
            </div>
        </div>
    );
};
