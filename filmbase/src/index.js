import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { ClickLoginContext } from "./Context/isClickedContext";

import App from "./App";
import { AuthProvider } from "./Context/isLoggedContext";
import { MobileContextProvider } from "./Context/isMobile";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <ClickLoginContext>
                <MobileContextProvider>
                    <App />
                </MobileContextProvider>
            </ClickLoginContext>
        </AuthProvider>
    </React.StrictMode>
);
