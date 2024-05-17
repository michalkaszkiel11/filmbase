import { useEffect, useRef, useState } from "react";
import { StarRating } from "../../StarRating";
import { api } from "../../utils/apiInstance";
import { Spinner } from "../../fillers/Spinner";
import { deleteMovie } from "../../methods/deleteMovie";
// import { FilmDetails } from "./FilmDetails";

export const Film = ({
    watch,
    loggedInUser,
    setIsWatchedUpadted,
    getMovie,
    movieDetails,
}) => {
    const email = loggedInUser ? loggedInUser.email : "";
    const [userRating, setUserRating] = useState(watch.userRating);
    const [isDetailClicked, setIsDetailClicked] = useState(false);
    const filmRef = useRef();
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (filmRef.current && !filmRef.current.contains(e.target)) {
                setIsDetailClicked(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    const updateUserRating = async () => {
        const payload = {
            email: email,
            userRating: userRating,
            _id: watch._id,
        };

        try {
            setIsWatchedUpadted(true);
            const response = await fetch(
                `${api}/api/users/film/update-user-rating`,
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
    const isDetailStyles = {
        width: "90%",
    };
    useEffect(() => {
        updateUserRating();
    }, [userRating]);

    return (
        <>
            {watch ? (
                <div
                    ref={filmRef}
                    className="film-box-wrapper"
                    style={isDetailClicked ? isDetailStyles : {}}
                    onClick={(e) => {
                        getMovie(watch);
                        console.log("movieDetails", watch);
                        setIsDetailClicked(true);
                    }}
                >
                    <div className="film-box">
                        <i
                            className="fa fa-solid fa-xmark close-movie"
                            onClick={() =>
                                deleteMovie(email, watch, setIsWatchedUpadted)
                            }
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
                    {isDetailClicked &&
                        // <FilmDetails movieDetails={movieDetails} />
                        movieDetails.Plot}
                </div>
            ) : (
                <Spinner />
            )}
        </>
    );
};
