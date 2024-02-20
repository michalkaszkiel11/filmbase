import { Movie } from "./Movie";

export const MovieList = ({ movies, setSelectedId }) => {
    return (
        <ul className="list">
            {movies?.map((movie) => (
                <Movie
                    movie={movie}
                    key={movie.imbID}
                    setSelectedId={setSelectedId}
                />
            ))}
        </ul>
    );
};
