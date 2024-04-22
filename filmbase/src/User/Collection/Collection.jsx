import { Box } from "../../Box";
import { MovieList } from "./MovieList";

export const Collection = ({ watched, loggedInUser }) => {
    return (
        <div className="collection">
            <Box classN="collection-box">
                <MovieList watched={watched} loggedInUser={loggedInUser} />
            </Box>
        </div>
    );
};
