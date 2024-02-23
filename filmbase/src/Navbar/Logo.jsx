export const Logo = ({ setMovies }) => {
    return (
        <div className="logo-box" onClick={() => setMovies([])}>
            <div className="logo"></div>
            <h1 className="logo-h1">Film-base</h1>
        </div>
    );
};
