import { Box } from "../../Box";
import { MovieList } from "./MovieList";

export const Collection = ({ watched }) => {
    return (
        <div className="collection">
            <Box classN="collection-box">
                <MovieList watched={watched} />
            </Box>
        </div>
    );
};
