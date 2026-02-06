'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface ThemeContextType {
    primaryColor: string;
    setPrimaryColor: (color: string) => void;
    detailsColor: string;
    setDetailsColor: (color: string) => void;
    resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [primaryColor, setPrimaryColor] = useState('#b91c1c');
    const [detailsColor, setDetailsColor] = useState('#1e3a8a');

    // Load from LocalStorage on mount
    useEffect(() => {
        const savedPrimary = localStorage.getItem('theme-primary');
        const savedDetails = localStorage.getItem('theme-details');

        if (savedPrimary) setPrimaryColor(savedPrimary);
        if (savedDetails) setDetailsColor(savedDetails);
    }, []);

    // Updates CSS variables whenever state changes
    useEffect(() => {
        document.documentElement.style.setProperty('--theme-primary', primaryColor);
        localStorage.setItem('theme-primary', primaryColor);
    }, [primaryColor]);

    useEffect(() => {
        document.documentElement.style.setProperty('--theme-details', detailsColor);
        localStorage.setItem('theme-details', detailsColor);
    }, [detailsColor]);

    const resetTheme = () => {
        setPrimaryColor('#b91c1c');
        setDetailsColor('#1e3a8a');
    };

    return (
        <ThemeContext.Provider value={{
            primaryColor,
            setPrimaryColor,
            detailsColor,
            setDetailsColor,
            resetTheme
        }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
