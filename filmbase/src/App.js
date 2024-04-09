import { useEffect } from "react";
import { useRef, useState } from "react";
import { useClickContext } from "./Context/isClickedContext";
import { Fade } from "react-awesome-reveal";
import { Navbar } from "./Navbar/Navbar";
import { Search } from "./Navbar/Search";
import { NumResults } from "./Navbar/NumResults";
import { Logo } from "./Navbar/Logo";
import { Main } from "./Main/Main";
import { Box } from "./Box";
import { MovieDetails } from "./Main/MovieDetails/MovieDetails";
import { Carousel } from "./Slider/Carousel";
import { Pages } from "./Slider/Pages";
import { LandingPage } from "./Main/LandingPage/LandingPage";
import { UserBox } from "./Navbar/UserBox";
import { Login } from "./User/Login";
import { useMobileContext } from "./Context/isMobile";

const apiKey = "9fef7c80";
export default function App() {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const [results, setResults] = useState("");
    const [selectedId, setSelectedId] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState([]);
    const [rating, setRating] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isRegister, setIsRegister] = useState(false);
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isDashboardOpen, setIsDashboardOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const searchInputRef = useRef(null);
    const { isLogClicked, goHome } = useClickContext();
    const { isMobile } = useMobileContext();
    const pickedMovieRef = useRef(null);
    const pages = results / 10;
    const boxOverlay = !selectedId ? "overlay" : "";
    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        userRating,
    } = selectedMovie;
    async function getSelectedMovie(id) {
        try {
            setLoading(true);
            const res = await fetch(
                `https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`
            );
            const data = await res.json();
            setSelectedMovie(data);
            console.log(selectedMovie);
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
                    `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}&page=${currentPage}`,
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
    function generateRandomId(length) {
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let id = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            id += characters[randomIndex];
        }
        return id;
    }

    const createUser = async (e) => {
        e.preventDefault();
        const newUser = {
            userId: generateRandomId(10),
            userName: userName,
            email: email,
            password: password,
        };
        try {
            setLoading(true);
            const response = await fetch(
                "http://localhost:10000/api/users/create",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newUser),
                }
            );
            if (!response.ok) {
                setIsRegister(false);
                setLoading(false);
                throw new Error("Network response wasn't ok");
            }
            setIsRegister(true);
            const data = await response.json();
            console.log("New user created successfully:", data);
        } catch (e) {
            setLoading(false);
            console.error("Error creating new user:", e);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = (e) => {
        e.preventDefault();
        const newWatchedMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            userRating: userRating,
            runtime,
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
    const handleDashboard = () => {
        setIsDashboardOpen(!isDashboardOpen);
    };
    return (
        <div className="App">
            <Navbar>
                {!isMobile && (
                    <Logo
                        setMovies={setMovies}
                        setSelectedId={setSelectedId}
                        goHome={goHome}
                    />
                )}
                <Search
                    query={query}
                    setQuery={setQuery}
                    searchInputRef={searchInputRef}
                />
                <NumResults results={results} />
                <UserBox
                    watched={watched}
                    handleDashboard={handleDashboard}
                    isDashboardOpen={isDashboardOpen}
                />
            </Navbar>
            {!isLogClicked ? (
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
                                <Fade className="faded overlay">
                                    <Box classN="selected-movie overlay">
                                        <MovieDetails
                                            handleAdd={handleAdd}
                                            selectedMovie={selectedMovie}
                                            pickedMovieRef={pickedMovieRef}
                                            rating={rating}
                                            setRating={setRating}
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
                <Login
                    setUserName={setUserName}
                    setEmail={setEmail}
                    setPassword={setPassword}
                    createUser={createUser}
                    loading={loading}
                    isRegister={isRegister}
                    setLoading={setLoading}
                />
            )}
        </div>
    );
}
