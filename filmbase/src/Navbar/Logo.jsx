export const Logo = ({ setMovies, setSelectedId }) => {
    return (
        <div
            className="logo-box"
            onClick={() => {
                setSelectedId(null);
                setMovies([]);
            }}
        >
            <div className="logo"></div>
            <h1 className="logo-h1">Filmbase.</h1>
        </div>
    );
};
