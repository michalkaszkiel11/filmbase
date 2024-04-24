import { Film } from "./Film";
export const MovieList = ({ watched, loggedInUser, setIsWatchedUpadted }) => {
    const shouldScroll = watched.length > 4 ? "scroll" : "";
    return (
        <ul className="movie-list-ul" style={{ overflow: shouldScroll }}>
            {watched.map((watch) => (
                <Film
                    key={watch._id}
                    watch={watch}
                    loggedInUser={loggedInUser}
                    setIsWatchedUpadted={setIsWatchedUpadted}
                />
            ))}
        </ul>
    );
};
