import { Movie } from "./Movie";

export const MovieList = ({ movies, setSelectedId, nextPage, prevPage }) => {
    return (
        <>
            <i
                className="fa-solid fa-chevron-left"
                onClick={() => prevPage()}
            ></i>
            <ul className="movie-list">
                {movies?.map((movie) => (
                    <Movie
                        movie={movie}
                        key={movie.imbID}
                        setSelectedId={setSelectedId}
                    />
                ))}
            </ul>
            <i
                className="fa-solid fa-chevron-right"
                onClick={() => nextPage()}
            ></i>
        </>
    );
};
