import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./App.css";
import GlobalStyles from "./styles/GlobalStyles.ts";
import { DarkModeProvider } from "./Contexts/DarkModeContext.jsx";
import "./Api/userController.ts";
import "./i18n";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <DarkModeProvider>
            <GlobalStyles />
            <App />
        </DarkModeProvider>
    </React.StrictMode>
);
