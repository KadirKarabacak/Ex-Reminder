import React, { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../Hooks/useLocalStorageState";
import toast from "react-hot-toast";

interface DarkModeProviderProps {
    children: React.ReactNode;
}

interface DarkModeContextProps {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

// usecontext ile değer alınırken undefined gelme ihtimaline karşı eklemeliyiz.
const DarkModeContext = createContext<DarkModeContextProps | undefined>(
    undefined
);

const DarkModeProvider: React.FC<DarkModeProviderProps> = ({ children }) => {
    const isUserUsingDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;
    const [isDarkMode, setIsDarkMode] = useLocalStorageState(
        isUserUsingDarkMode,
        "isDarkMode"
    );

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark-mode");
            document.documentElement.classList.remove("light-mode");
        } else {
            document.documentElement.classList.remove("dark-mode");
            document.documentElement.classList.add("light-mode");
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        toast.success(`Changed to ${!isDarkMode ? "Dark Mode" : "Light Mode"}`);
    };

    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};

function useDarkMode() {
    const context = useContext(DarkModeContext);
    if (context === undefined)
        throw new Error("DarkModeContext was used outside of DarkModeProvider");
    return context;
}

export { DarkModeProvider, useDarkMode };
