import { Film } from "./Film";

export const MovieList = ({ watched, loggedInUser }) => {
    return (
        <ul className="movie-list-ul">
            {watched.map((watch) => (
                <Film
                    key={watch._id}
                    watch={watch}
                    loggedInUser={loggedInUser}
                />
            ))}
        </ul>
    );
};
