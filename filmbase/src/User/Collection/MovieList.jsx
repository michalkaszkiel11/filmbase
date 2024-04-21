import { Film } from "./Film";

export const MovieList = ({ watched }) => {
    return (
        <ul>
            {watched.map((watch) => (
                <Film key={watch._id} watch={watch} />
            ))}
        </ul>
    );
};
