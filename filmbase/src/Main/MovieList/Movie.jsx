// import { useState } from "react";
export const Movie = ({ movie, setSelectedId, handleFocusOnMovie }) => {
    function setId(id) {
        setSelectedId(id);
    }
    return (
        <div
            key={movie.imdbID}
            onClick={() => {
                setId(movie.imdbID);
                handleFocusOnMovie();
            }}
            className="movie"
        >
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>🗓</span>
                    <span>{movie.Year}</span>
                </p>
            </div>
        </div>
    );
};
