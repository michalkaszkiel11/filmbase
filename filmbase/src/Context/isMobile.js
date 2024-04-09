import { createContext, useContext, useEffect, useState } from "react";

const MobileContext = createContext();

export const MobileContextProvider = ({ children }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 600) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };
        handleResize(); // set initial state
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <MobileContext.Provider value={{ isMobile }}>
            {children}
        </MobileContext.Provider>
    );
};

export const useMobileContext = () => useContext(MobileContext);
