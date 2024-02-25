import { useState } from "react";

export const Pages = ({ pages, currentPage, setCurrentPage }) => {
    const pagesToShow = 10;
    const [currentSet, setCurrentSet] = useState(1);

    const totalSets = Math.ceil(pages / pagesToShow);

    const startPage = (currentSet - 1) * pagesToShow + 1;
    const endPage = Math.min(currentSet * pagesToShow, pages);

    const pagesArray = Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
    );

    const pageHandler = (index) => {
        setCurrentPage(index);
    };

    const nextSet = () => {
        setCurrentSet((prevSet) => Math.min(prevSet + 1, totalSets));
    };

    const prevSet = () => {
        setCurrentSet((prevSet) => Math.max(prevSet - 1, 1));
    };

    return (
        <div className="pagination">
            <button
                onClick={prevSet}
                disabled={currentSet === 1}
                className="btn"
            >
                Previous
            </button>
            {pagesArray.map((page, index) => (
                <div
                    key={index}
                    onClick={() => {
                        pageHandler(page);
                    }}
                    className={`page ${
                        currentPage === page ? "active-page" : ""
                    }`}
                >
                    {page}
                </div>
            ))}
            <button
                onClick={nextSet}
                disabled={currentSet === totalSets}
                className="btn"
            >
                Next
            </button>
        </div>
    );
};
