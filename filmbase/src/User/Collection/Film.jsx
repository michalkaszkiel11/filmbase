import { useState } from "react";
import { StarRating } from "../../StarRating";

export const Film = ({ watch }) => {
    const [userRating, setUserRating] = useState(0);
    const updateUserRating = async () => {
        const payload = { userRating, _id: watch._id };
        try {
            const response = await fetch(
                "http://localhost:10000/api/users/film/update-user-rating",
                {
                    method: "PATCH",
                    header: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );
            if (!response.ok) {
                throw new Error("Network error");
            }
            const data = response.json();
        } catch (err) {
            console.log("error updating user rating", err);
        }
    };
    return (
        <div className="film-box">
            <img src={watch.Poster} alt="poster" />
            <h3>{watch.Title}</h3>
            <p>{watch.Year}</p>
            <div className="film-imdb-rating-box">
                <p>imdb rating: </p>
                <StarRating
                    rating={watch.imdbRating}
                    maxRating={10}
                    disabled="true"
                    size={24}
                />
            </div>
            <div className="film-imdb-rating-user">
                <p>your rating</p>
                <StarRating
                    rating={watch.userRating}
                    maxRating={10}
                    disabled="false"
                    size={24}
                    setRating={setUserRating}
                    onRate={updateUserRating}
                />
            </div>
        </div>
    );
};
