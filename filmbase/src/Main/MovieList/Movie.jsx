// import { useState } from "react";
export const Movie = ({ movie, setSelectedId }) => {
    function setId(id) {
        setSelectedId(id);
        console.log(id);
    }
    return (
        <div
            key={movie.imdbID}
            onClick={() => setId(movie.imdbID)}
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
