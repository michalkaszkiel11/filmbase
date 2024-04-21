import { useState } from "react";

export const Box = ({ children, classN }) => {
    // const [isOpen, setIsOpen] = useState(true);

    return <div className={classN}>{children}</div>;
};
