import { Navbar } from "./Navbar/Navbar";
import { Main } from "./Main/Main";
import { useState } from "react";
import { Search } from "./Navbar/Search";
import { NumResults } from "./Navbar/NumResults";
import { Box } from "./ListBox";
import { MovieList } from "./Main/MovieList/MovieList";
import { WatchedSummary } from "./Main/Watched/WatchedSummary";
import { WatchedMoviesList } from "./Main/Watched/WatchedMoviesList";
import { useEffect } from "react";
import { MovieDetails } from "./Main/MovieDetails/MovieDetails";
import { LoginNav, User } from "./Navbar/User";
import { Logo } from "./Navbar/Logo";

const apiKey = "9fef7c80";
export default function App() {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        userRating,
        // Plot: plot,
        // Released: released,
        // Actors: actors,
        // Director: director,
        // Genre: genre,
    } = selectedMovie;
    async function getSelectedMovie(id) {
        try {
            setLoading(true);
            const res = await fetch(
                `http://www.omdbapi.com/?apikey=${apiKey}&i=${id}`
            );
            const data = await res.json();
            setSelectedMovie(data);
            setLoading(false);
            console.log(selectedMovie);
            console.log(data);
        } catch (e) {
            console.error(e);
            setLoading(false);
        }
    }

    useEffect(() => {
        const controller = new AbortController();
        async function fetching() {
            try {
                setLoading(true);
                const res = await fetch(
                    `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}&page=${currentPage}`,
                    { signal: controller.signal }
                );
                const data = await res.json();
                if (data.Search && Array.isArray(data.Search)) {
                    setMovies(data.Search);
                }
                setLoading(false);
                console.log(data);
            } catch (e) {
                if (e.name !== "AbortError") {
                    console.error(e);
                }
                setLoading(false);
            }
            if (query < 3) {
                setMovies([]);
                return;
            }
        }
        fetching();
        return function () {
            controller.abort();
        };
    }, [query, currentPage]);
    useEffect(() => {
        getSelectedMovie(selectedId);
    }, [selectedId]);
    useEffect(() => {
        changeTitle();
    }, [selectedMovie]);
    const closeDetails = () => {
        setSelectedId(false);
        console.log(selectedId, selectedMovie);
    };
    const handleAdd = (e) => {
        e.preventDefault();
        const newWatchedMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            userRating: Number(userRating),
            runtime: Number(runtime.split(" ").at(0)),
        };
        handleAddWatched(newWatchedMovie);
        closeDetails();
    };
    const handleAddWatched = () => {
        setWatched((watchedMovie) => [...watchedMovie, selectedMovie]);
    };
    const changeTitle = () => {
        return (document.title = selectedMovie.Title
            ? selectedMovie.Title
            : "Film-base");
    };
    const nextPage = () => {
        if (currentPage < 101) setCurrentPage((prevPage) => prevPage + 1);
    };
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };
    return (
        <div className="App">
            <Navbar>
                <Logo />
                <Search query={query} setQuery={setQuery} />
                <NumResults movies={movies} />
                <User />
            </Navbar>
            <Main>
                <Box>
                    {loading ? (
                        <div className="loading-spinner"></div>
                    ) : (
                        <MovieList
                            movies={movies}
                            setSelectedId={setSelectedId}
                            nextPage={nextPage}
                            prevPage={prevPage}
                        />
                    )}
                </Box>
                {/* <Box>
                    {selectedId ? (
                        <>
                            <button onClick={() => closeDetails()}>
                                ◀ Close details
                            </button>
                            {loading ? (
                                <div className="loading-spinner"></div>
                            ) : (
                                <MovieDetails
                                    selectedId={selectedId}
                                    selectedMovie={selectedMovie}
                                    handleAddWatched={handleAddWatched}
                                    handleAdd={handleAdd}
                                />
                            )}
                        </>
                    ) : (
                        <>
                            <WatchedSummary watched={watched} />
                            <WatchedMoviesList watched={watched} />
                        </>
                    )}
                </Box> */}
            </Main>
        </div>
    );
}
