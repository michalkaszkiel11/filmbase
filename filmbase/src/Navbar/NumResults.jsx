export const NumResults = ({ movies }) => {
    return (
        <p className="search-results">
            Found <strong>{movies?.length}</strong> results
        </p>
    );
};
