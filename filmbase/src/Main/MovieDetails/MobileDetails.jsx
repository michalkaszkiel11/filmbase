import { useEffect } from "react";
import { StarRating } from "../../StarRating";
import { Plot } from "./Plot";
import { deleteMovie } from "../../methods/deleteMovie";

export const MobileDetails = ({
    selectedMovie,
    pickedMovieRef,
    handleAdd,
    rating,
    setRating,
    watched,
    setIsWatchedUpadted,
    loggedInUser,
    setSelectedId,
}) => {
    useEffect(() => {
        if (pickedMovieRef.current) {
            pickedMovieRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [pickedMovieRef]);
    const watchedMovies = watched.some(
        (movie) => movie.Poster === selectedMovie.Poster
    );
    const selectedMovieId = watched.find(
        (movie) => movie.Poster === selectedMovie.Poster
    );
    const selectedId = selectedMovieId ? selectedMovieId._id : null;

    return (
        <>
            <div className="details-overview" ref={pickedMovieRef}>
                <div className="details-poster_titles">
                    <div className="details-poster">
                        <img
                            src={selectedMovie.Poster}
                            alt="poster"
                            className="details-img"
                        />
                    </div>
                    <div className="details-titles">
                        <h2 className="details-overview-h2">
                            {selectedMovie.Title}
                        </h2>
                        <div className="details-overview-p">
                            <span>{selectedMovie.Released},</span>
                            <span>
                                {" "}
                                {selectedMovie.Runtime}{" "}
                                <i className="fa-solid fa-hourglass-half"></i>
                            </span>
                        </div>
                        <span>{selectedMovie.Genre}</span>
                        <div>
                            <span>⭐</span>
                            <span>IMDb rating {selectedMovie.imdbRating}</span>
                        </div>
                    </div>
                </div>
                <div className="details-section">
                    <StarRating
                        maxRating={10}
                        size={24}
                        rating={rating}
                        setRating={setRating}
                    />
                    <button onClick={handleAdd} className="btn add-to">
                        {watchedMovies === true ? (
                            <span
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    deleteMovie(
                                        loggedInUser.email,
                                        selectedId,
                                        setIsWatchedUpadted,
                                        setSelectedId
                                    );
                                }}
                            >
                                <i class="fa-solid fa-circle-check"></i>
                            </span>
                        ) : (
                            "+ Add to list"
                        )}
                    </button>
                    <Plot selectedMovie={selectedMovie} />
                </div>
            </div>
        </>
    );
};
