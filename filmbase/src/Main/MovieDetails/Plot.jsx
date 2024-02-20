export const Plot = ({ selectedMovie }) => {
    return (
        <div className="details-overview-cont">
            <p className="details">{selectedMovie.Plot}</p>
            <span className="details">{selectedMovie.Actors}</span>
            <span className="details">{selectedMovie.Director}</span>
        </div>
    );
};
