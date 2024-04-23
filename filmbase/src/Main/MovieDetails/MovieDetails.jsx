import { useEffect } from "react";
import { StarRating } from "../../StarRating";
import { Plot } from "./Plot";

export const MovieDetails = ({
    selectedMovie,
    pickedMovieRef,
    handleAdd,
    rating,
    setRating,
}) => {
    useEffect(() => {
        if (pickedMovieRef.current) {
            pickedMovieRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [pickedMovieRef]);
    return (
        <>
            <div className="details-overview" ref={pickedMovieRef}>
                <div>
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
                <div className="details-section">
                    <StarRating
                        maxRating={10}
                        size={24}
                        rating={rating}
                        setRating={setRating}
                    />
                    <button onClick={handleAdd} className="btn add-to">
                        {/* <i className="fa-regular fa-circle-check"></i> */}+
                        Add to list
                    </button>
                    <Plot selectedMovie={selectedMovie} />
                </div>
            </div>
            <div className="details-poster">
                <img
                    src={selectedMovie.Poster}
                    alt="poster"
                    className="details-img"
                />
            </div>
        </>
    );
};
