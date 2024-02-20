import { StarRating } from "../../StarRating";
import { Plot } from "./Plot";

export const MovieDetails = ({
    selectedId,
    selectedMovie,
    handleAddWatched,
    handleAdd,
}) => {
    return (
        <>
            <div className="details-overview">
                <img
                    src={selectedMovie.Poster}
                    alt="poster"
                    className="details-img"
                />
                <h2 className="details-overview-h2">{selectedMovie.Title}</h2>
                <div className="details-overview-p">
                    <span>{selectedMovie.Released}</span>
                    <span>{selectedMovie.Runtime}</span>
                </div>
                <span>{selectedMovie.Genre}</span>
                <div>
                    <span>⭐</span>
                    <span>IMDb rating{selectedMovie.imdbRating}</span>
                </div>
            </div>
            <div className="details-section">
                <StarRating maxRating={10} size={24} />
                <button onClick={handleAdd} className="btn-add">
                    + Add to list
                </button>
                <Plot selectedMovie={selectedMovie} />
            </div>
        </>
    );
};
