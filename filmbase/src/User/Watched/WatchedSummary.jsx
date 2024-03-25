import { Fade } from "react-awesome-reveal";

export const WatchedSummary = ({ watched }) => {
    const summary = (arr) => arr.reduce((acc, cur) => acc + cur);
    const average = (arr) =>
        arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
    const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    const avgUserRating = average(watched.map((movie) => movie.userRating));
    const timeWatched =
        watched.length > 0
            ? summary(
                  watched.map((movie) => parseInt(movie.Runtime.split(" ")[0]))
              ) / 60
            : 0;

    return (
        <Fade className="summary">
            <>
                <div className="watched-options">
                    <p>
                        <i className="fa-solid fa-clapperboard"></i>
                        <span>watched {watched.length} movies</span>
                    </p>
                    <p>
                        <i className="fa-solid fa-star"></i>
                        <span>imdb rating {avgImdbRating.toFixed(2)}</span>
                    </p>
                    <p>
                        <i className="fa-solid fa-bahai"></i>
                        <span>your rating {avgUserRating.toFixed(2)}</span>
                    </p>
                    <p>
                        <i className="fa-regular fa-hourglass-half"></i>
                        <span> {timeWatched.toFixed(2)} h watched</span>
                    </p>
                </div>
            </>
        </Fade>
    );
};
