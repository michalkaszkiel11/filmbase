import { Fade } from "react-awesome-reveal";

export const LandingPage = ({ handleFocus }) => {
    return (
        <div className="landing-page">
            <Fade className="fade" direction="down" delay={500}>
                <div className="landing-page-graphic">
                    <div className="graphic"></div>
                </div>
                <div className="landing-page-info">
                    <h1>
                        Movies <span className="header-span">tonight</span>
                    </h1>
                    <p>
                        Welcome to our website, where you can explore a huge
                        collection of movies! Discover detailed information
                        about each film, including the Title, Year of release,
                        Poster images, Runtime, IMDb rating, and User rating.
                        Get ready to join the world of cinema by exploring
                        additional details such as Plot, Release date, Actors,
                        Director, and Genre. Enjoy the ultimate movie experience
                        with our comprehensive database at your fingertips.
                    </p>
                </div>
                <button className="btn learn-more" onClick={handleFocus}>
                    Search now
                </button>
            </Fade>
        </div>
    );
};
