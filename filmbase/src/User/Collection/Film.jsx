import { useEffect, useState } from "react";
import { StarRating } from "../../StarRating";
import { Skew } from "../../Skew";

export const Film = ({ watch, loggedInUser, setIsWatchedUpadted }) => {
    const email = loggedInUser ? loggedInUser.email : "";
    const [userRating, setUserRating] = useState(watch.userRating);
    const updateUserRating = async () => {
        const payload = {
            email: email,
            userRating: userRating,
            _id: watch._id,
        };

        try {
            setIsWatchedUpadted(true);
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
            setUserRating(data.userRating);
            setIsWatchedUpadted(false);
        } catch (err) {
            console.log("Error updating user rating:", err);
            setIsWatchedUpadted(false);
        } finally {
            setIsWatchedUpadted(false);
        }
    };
    const deleteMovie = async () => {
        const payload = {
            email: email,
            _id: watch._id,
        };
        try {
            setIsWatchedUpadted(true);
            const response = await fetch(
                "http://localhost:10000/api/users/film/delete-film",
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );
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

    useEffect(() => {
        updateUserRating();
    }, [userRating]);

    return (
        <div className="film-box">
            <i
                className="fa fa-solid fa-xmark close-movie"
                onClick={deleteMovie}
            ></i>
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
