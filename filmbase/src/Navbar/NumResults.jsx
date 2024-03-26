export const NumResults = ({ results }) => {
    return (
        <>
            {results && (
                <p className="search-results">
                    <strong>{results}</strong> results
                </p>
            )}
        </>
    );
};
