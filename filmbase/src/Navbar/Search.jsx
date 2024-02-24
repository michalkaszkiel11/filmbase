import scope from "../images/scope1.png";
export const Search = ({ query, setQuery, searchInputRef }) => {
    return (
        <div className="search-box">
            <input
                className="search"
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                }}
                ref={searchInputRef}
            />
            <img src={scope} alt="scope-icon" className="scope-icon" />
        </div>
    );
};
