export const LandingPage = () => {
    return (
        <div className="landing-page">
            <div className="landing-page-graphic">
                <div className="graphic"></div>
            </div>
            <div className="landing-page-info">
                <h1>
                    Movie <span className="header-span">tonight</span>
                </h1>
                <p>
                    Welcome to our website, where you can explore a vast
                    collection of movies! Discover detailed information about
                    each film, including the Title, Year of release, Poster
                    images, Runtime, IMDb rating, and User rating. Immerse
                    yourself in the world of cinema by exploring additional
                    details such as Plot, Release date, Actors, Director, and
                    Genre. Enjoy the ultimate movie experience with our
                    comprehensive database at your fingertips.
                </p>
                <button className="btn learn-more">Learn more</button>
            </div>
        </div>
    );
};
