import filmbase from "../images/Filmbase1.png";

export const Logo = ({ setMovies, setSelectedId, goHome }) => {
    return (
        <div
            className="logo-box"
            onClick={() => {
                setSelectedId(null);
                setMovies([]);
                goHome();
                window.location.reload();
            }}
        >
            <img className="logo" src={filmbase} alt="logo"></img>
        </div>
    );
};
