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
import { Carousel } from "./Slider/Carousel";
import { Pages } from "./Slider/Pages";
import { LandingPage } from "./Main/LandingPage/LandingPage";
import { UserBox } from "./Navbar/UserBox";
import { Login } from "./User/Login";
import { useMobileContext } from "./Context/isMobile";
import { MovieDetails } from "./Main/MovieDetails/MovieDetails";
import { MobileDetails } from "./Main/MovieDetails/MobileDetails";
import { useAuth } from "./Context/isLoggedContext";
import { Collection } from "./User/Collection/Collection";

const apiKey = "9fef7c80";
export default function App() {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const [isWatchedUpadted, setIsWatchedUpadted] = useState(false);
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
    const [showCollection, setShowCollection] = useState(false);
    const searchInputRef = useRef(null);
    const { isLogClicked, goHome } = useClickContext();
    const { isMobile } = useMobileContext();
    const pickedMovieRef = useRef(null);
    const pages = results / 10;
    const boxOverlay = !selectedId ? "overlay" : "";
    const { login, setLoggedInUser, loggedInUser } = useAuth();

    async function getSelectedMovie(id) {
        try {
            setLoading(true);
            const res = await fetch(
                `https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`
            );
            const data = await res.json();
            setSelectedMovie(data);
            console.log(data);

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

    useEffect(() => {
        if (loggedInUser && loggedInUser.email) {
            // Check if loggedInUser and email are defined
            getWatched(loggedInUser.email);
        }
    }, [loggedInUser, isWatchedUpadted]);

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
    const updateWatched = async (watched) => {
        const {
            Title,
            imdbRating,
            Runtime,
            userRating,
            Actors,
            Awards,
            Plot,
            Poster,
        } = watched;
        const updatedWatched = {
            email: loggedInUser.email,
            watched: [
                {
                    Title,
                    imdbRating,
                    Runtime,
                    userRating,
                    Actors,
                    Awards,
                    Plot,
                    Poster,
                },
            ],
        };
        try {
            setIsWatchedUpadted(true);
            const response = await fetch(
                "http://localhost:10000/api/users/update-watched",
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedWatched),
                }
            );
            if (!response.ok) {
                throw new Error("Network response wasn't ok");
            }
            const data = await response.json();
            console.log("Watch list updated successfully:", data);
        } catch (e) {
            console.error("Error updating watched:", e);
            setIsWatchedUpadted(false);
        } finally {
            setIsWatchedUpadted(false);
        }
    };

    const getWatched = async (email) => {
        try {
            const response = await fetch(
                `http://localhost:10000/api/users/getWatched/${email}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (!response.ok) {
                throw new Error("Network response wasn't ok");
            }
            const data = await response.json();
            setWatched(data.user.watched);
            console.log("Watch list retrieved successfully:", data);
        } catch (e) {
            console.error("Error retrieving watchlist:", e);
        }
    };
    const handleAdd = (e) => {
        e.preventDefault();
        const movieRating = { ...selectedMovie };
        movieRating.userRating = rating;
        console.log("this is movie rating :", movieRating);
        updateWatched(movieRating);
        setRating(0);
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
                    setShowCollection={setShowCollection}
                    setMovies={setMovies}
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
                                        {isMobile ? (
                                            <MobileDetails
                                                handleAdd={handleAdd}
                                                selectedMovie={selectedMovie}
                                                pickedMovieRef={pickedMovieRef}
                                                rating={rating}
                                                setRating={setRating}
                                            ></MobileDetails>
                                        ) : (
                                            <MovieDetails
                                                handleAdd={handleAdd}
                                                selectedMovie={selectedMovie}
                                                pickedMovieRef={pickedMovieRef}
                                                rating={rating}
                                                setRating={setRating}
                                            />
                                        )}
                                    </Box>
                                </Fade>
                            )}
                        </>
                    ) : showCollection ? (
                        <Collection watched={watched} />
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
                    setLoading={setLoading}
                    isRegister={isRegister}
                    login={login}
                    setLoggedInUser={setLoggedInUser}
                />
            )}
        </div>
    );
}
