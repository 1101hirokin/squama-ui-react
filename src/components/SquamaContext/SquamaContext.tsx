import { createContext, useContext, useEffect, useState } from "react";
import { defaultDarkTheme, defaultLightTheme, Theme } from "../../api";

type SquamaContextProps = {
    getCurrentTheme: () => Theme;
    getCurrentThemeKey: () => string;
    updateCurrentTheme: (themeKey: string) => void;
    getThemeKeys: () => string[];
    getTheme: (themeKey: string) => Theme | undefined;
};

const notInitializedError = new Error("SquamaContextProvider not initialized");
const defaultSquamaContext: SquamaContextProps = {
    getCurrentTheme: () => {
        throw notInitializedError;
    },
    getCurrentThemeKey: () => {
        throw notInitializedError;
    },
    updateCurrentTheme: () => {
        throw notInitializedError;
    },
    getThemeKeys: () => {
        throw notInitializedError;
    },
    getTheme: () => {
        throw notInitializedError;
    },
};

const SquamaContext = createContext<SquamaContextProps>(defaultSquamaContext);

export const SquamaContextProvider = (p: {
    children: React.ReactNode;
    themes?: { [key: string]: Theme };
    initialThemeKey?: string;
}) => {
    const { children, themes, initialThemeKey = "squama-light" } = p;

    const _themes: { [key: string]: Theme } = {
        "squama-light": defaultLightTheme,
        "squama-dark": defaultDarkTheme,
        ...themes,
    };

    const [currentThemeKey, setCurrentThemeKey] =
        useState<string>(initialThemeKey);

    useEffect(() => {
        const currentTheme = _themes[currentThemeKey];

        if (currentTheme) {
            const body = document.querySelector("body");
            if (body) {
                body.setAttribute(
                    "data-theme",
                    currentTheme.isLight ? "light" : "dark",
                );
            }
        }
    }, [currentThemeKey]);

    return (
        <SquamaContext.Provider
            value={{
                getCurrentTheme: () => _themes[currentThemeKey],
                getCurrentThemeKey: () => currentThemeKey,
                updateCurrentTheme: (themeKey: string) => {
                    if (_themes[themeKey]) {
                        setCurrentThemeKey(themeKey);
                    } else {
                        console.error(`Theme ${themeKey} not found`);
                    }
                },
                getThemeKeys: () => Object.keys(_themes),
                getTheme: (themeKey: string) => _themes[themeKey],
            }}
        >
            {children}
        </SquamaContext.Provider>
    );
};

export const useSquamaContext = () => useContext(SquamaContext);
