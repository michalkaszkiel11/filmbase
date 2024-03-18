export const WatchedSummary = ({ watched }) => {
    const average = (arr) =>
        arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
    const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    const avgUserRating = average(watched.map((movie) => movie.userRating));
    const avgRuntime = average(
        watched.map((movie) => movie.Runtime.split(" ").at(0))
    );

    return (
        <div className="summary">
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
                    <span>avarage {avgRuntime.toFixed(2)} min watched</span>
                </p>
            </div>
        </div>
    );
};
