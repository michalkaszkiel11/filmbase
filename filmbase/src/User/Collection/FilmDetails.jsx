export const FilmDetails = ({ movieDetails }) => {
    const ismovie = movieDetails ? movieDetails.Plot : "";
    return (
        <div className="film-details" style={{ width: "100%" }}>
            {ismovie.Plot}
        </div>
    );
};
