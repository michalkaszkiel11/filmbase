import { Fade } from "react-awesome-reveal";

export const WatchedSummary = ({ watched, setShowCollection, setMovies }) => {
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
                    <div className="option">
                        <div>
                            <i className="fa-solid fa-clapperboard"></i>
                            <span> watched {watched.length} movies</span>
                        </div>
                        <div>
                            <i className="fa-solid fa-film"></i>
                            <strong
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    setShowCollection(true);
                                    setMovies(0);
                                }}
                            >
                                {" "}
                                See Collection
                            </strong>
                        </div>
                    </div>
                    <div>
                        <div>
                            <i className="fa-solid fa-star"></i>
                            <span> imdb rating {avgImdbRating.toFixed(2)}</span>
                        </div>
                        <div></div>
                    </div>
                    <div>
                        <div>
                            <i className="fa-solid fa-bahai"></i>
                            <span> your rating {avgUserRating.toFixed(2)}</span>
                        </div>
                        <div></div>
                    </div>
                    <div>
                        <div>
                            <i className="fa-regular fa-hourglass-half"></i>
                            <span> {timeWatched.toFixed(2)} h watched</span>
                        </div>
                        <div></div>
                    </div>
                </div>
            </>
        </Fade>
    );
};
