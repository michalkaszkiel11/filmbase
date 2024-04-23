import { Box } from "../../Box";
import { MovieList } from "./MovieList";

export const Collection = ({
    watched,
    loggedInUser,
    setIsWatchedUpadted,
    setShowCollection,
}) => {
    return (
        <div className="collection">
            <Box classN="collection-box">
                <i
                    className="fa-regular fa-circle-xmark close-list"
                    onClick={() => setShowCollection(false)}
                ></i>
                <MovieList
                    watched={watched}
                    loggedInUser={loggedInUser}
                    setIsWatchedUpadted={setIsWatchedUpadted}
                />
            </Box>
        </div>
    );
};
