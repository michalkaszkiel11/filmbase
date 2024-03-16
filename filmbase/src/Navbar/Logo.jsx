export const Logo = ({ setMovies, setSelectedId, goHome }) => {
    return (
        <div
            className="logo-box"
            onClick={() => {
                setSelectedId(null);
                setMovies([]);
                goHome();
            }}
        >
            <h1 className="logo-h1">Filmbase.</h1>
        </div>
    );
};
