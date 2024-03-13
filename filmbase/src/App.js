import { Navbar } from "./Navbar/Navbar";
import { Main } from "./Main/Main";
import { useRef, useState } from "react";
import { Search } from "./Navbar/Search";
import { NumResults } from "./Navbar/NumResults";
import { Box } from "./Box";
// import { WatchedSummary } from "./Main/Watched/WatchedSummary";
// import { WatchedMoviesList } from "./Main/Watched/WatchedMoviesList";
import { useEffect } from "react";
import { MovieDetails } from "./Main/MovieDetails/MovieDetails";

import { Logo } from "./Navbar/Logo";
import { Carousel } from "./Slider/Carousel";
import { Pages } from "./Slider/Pages";
import { LandingPage } from "./Main/LandingPage/LandingPage";
// import { Plot } from "./Main/MovieDetails/Plot";
import { Fade } from "react-awesome-reveal";
import { UserBox } from "./Navbar/UserBox";
import { Login } from "./User/Login";

const apiKey = "9fef7c80";
export default function App() {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const [results, setResults] = useState("");
    const [selectedId, setSelectedId] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLogClicked, setIsLogClicked] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const searchInputRef = useRef(null);
    const pickedMovieRef = useRef(null);
    const pages = results / 10;
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
                if (data.totalResults) {
                    setResults(data.totalResults);
                }
                setLoading(false);
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
    const handleFocus = () => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    };
    const handleFocusOnMovie = () => {
        if (pickedMovieRef.current) {
            pickedMovieRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };
    const boxOverlay = !selectedId ? "overlay" : "";
    return (
        <div className="App">
            <Navbar>
                <Logo setMovies={setMovies} setSelectedId={setSelectedId} />
                <Search
                    query={query}
                    setQuery={setQuery}
                    searchInputRef={searchInputRef}
                />
                <NumResults results={results} />
                <UserBox
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                />
            </Navbar>
            {isLogClicked ? (
                <Main>
                    {movies.length ? (
                        <>
                            <Box classN={`movie-box ${boxOverlay}`}>
                                <Carousel
                                    movies={movies}
                                    setSelectedId={setSelectedId}
                                    results={results}
                                    loading={loading}
                                    handleFocusOnMovie={handleFocusOnMovie}
                                />

                                <Pages
                                    results={results}
                                    pages={pages}
                                    setCurrentPage={setCurrentPage}
                                    currentPage={currentPage}
                                />
                            </Box>
                            {selectedId && (
                                <Fade className="faded">
                                    <Box classN="selected-movie">
                                        <MovieDetails
                                            handleAdd={handleAdd}
                                            selectedMovie={selectedMovie}
                                            pickedMovieRef={pickedMovieRef}
                                        />
                                    </Box>
                                </Fade>
                            )}
                        </>
                    ) : (
                        <LandingPage handleFocus={handleFocus} />
                    )}
                </Main>
            ) : (
                <Login />
            )}
        </div>
    );
}
