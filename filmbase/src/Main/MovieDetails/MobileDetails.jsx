import { useEffect } from "react";
import { StarRating } from "../../StarRating";
import { Plot } from "./Plot";

export const MobileDetails = ({
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
                        <button onClick={handleAdd} className="btn add-to">
                            + Add to list
                        </button>
                    </div>
                </div>
                <div className="details-section">
                    <StarRating
                        maxRating={10}
                        size={24}
                        rating={rating}
                        setRating={setRating}
                    />

                    <Plot selectedMovie={selectedMovie} />
                </div>
            </div>
        </>
    );
};
