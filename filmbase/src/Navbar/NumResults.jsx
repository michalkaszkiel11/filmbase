export const NumResults = ({ results }) => {
    return (
        <>
            {results && (
                <p className="search-results">
                    Found <strong>{results}</strong> results
                </p>
            )}
        </>
    );
};
