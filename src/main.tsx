import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./App.css";
import GlobalStyles from "./styles/GlobalStyles.ts";
import { DarkModeProvider } from "./Contexts/DarkModeContext.jsx";
import "./Api/userController.ts";
import "./i18n";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DarkModeProvider>
                <GlobalStyles />
                <App />
            </DarkModeProvider>
        </LocalizationProvider>
    </React.StrictMode>
);
