import { Film } from "./Film";
import { useState } from "react";

export const MovieList = ({ watched, loggedInUser, setIsWatchedUpadted }) => {
    const [movieDetails, setMovieDetails] = useState(null); // Use null for initial state
    const getMovie = (watch) => {
        const movie = watched.find((movie) => movie.Poster === watch.Poster);
        if (movie) {
            setMovieDetails(movie);
        }
    };

    return (
        <div>
            <ul className="movie-list-ul">
                {watched.map((watch) => (
                    <Film
                        key={watch._id}
                        watch={watch}
                        loggedInUser={loggedInUser}
                        setIsWatchedUpadted={setIsWatchedUpadted}
                        getMovie={getMovie}
                        movieDetails={movieDetails}
                    />
                ))}
            </ul>
        </div>
    );
};
