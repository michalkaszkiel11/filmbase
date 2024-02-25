export const Plot = ({ selectedMovie }) => {
    const actorsStyle = {
        fontWeight: "bold",
    };
    return (
        <div className="details-overview-cont">
            <p className="details">{selectedMovie.Plot}</p>
            <span className="details" style={actorsStyle}>
                {selectedMovie.Actors}
            </span>
            <p className="details">
                Director:
                <span style={actorsStyle}> {selectedMovie.Director}</span>
            </p>
        </div>
    );
};
