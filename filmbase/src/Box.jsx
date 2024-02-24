import { useState } from "react";

export const Box = ({ children, classN }) => {
    // const [isOpen, setIsOpen] = useState(true);

    return (
        <div className={classN}>
            {/* <button
                className="btn-toggle"
                onClick={() => setIsOpen((open) => !open)}
            >
                {isOpen ? "–" : "+"}
            </button> */}
            {children}
        </div>
    );
};
