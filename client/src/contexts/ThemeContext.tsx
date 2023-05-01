import { createContext, useContext, useEffect, useState } from 'react'

export interface Theme {
    text: string
    invertedText: string
    muted: string
    background: string
    color: string
    gray70: string
    gray50: string
    gray20: string
    gray10: string
    gray5: string
}

// PUT NEW THEMES HERE:
export const lightTheme: Theme = {
    text: 'black',
    invertedText: 'white',
    muted: 'var(--gray-70)',
    background: 'white',
    color: 'black',
    gray70: 'rgba(0,0,0,0.7)',
    gray50: 'rgba(0,0,0,0.5)',
    gray20: 'rgba(0,0,0,0.2)',
    gray10: 'rgba(0,0,0,0.1)',
    gray5: 'rgba(0,0,0,0.05)'

}
export const darkTheme: Theme = {
    text: 'white',
    invertedText: 'black',
    muted: 'var(--gray-70)',
    background: 'black',
    color: 'white',
    gray70: 'rgba(255,255,255,0.7)',
    gray50: 'rgba(255,255,255,0.5)',
    gray20: 'rgba(255,255,255,0.2)',
    gray10: 'rgba(255,255,255,0.1)',
    gray5: 'rgba(255,255,255,0.05)'
}
// TO NEXT TIME: You were figuring out color themes, inverted text ok - now tackle the different transparencies.

// Context to store theme state and setters.
export const ThemeContextState = createContext<Theme>(lightTheme)
export const ThemeContextSetter = createContext<React.Dispatch<React.SetStateAction<Theme>>>(() => {})

/**
 * Provides a function that can be used to change the current theme.
 * @returns A function that changes the current theme.
 */
export const useSetTheme = () => useContext(ThemeContextSetter)

/**
 * Provides the current theme. Components inside the provider can use the theme
 * this hook provides.
 * @returns The current theme.
 */
export const useTheme = () => useContext(ThemeContextSetter)

interface ThemeContextProviderProps {
    children: any
}

/**
 * Provides the setter and getter for the current theme.
 *
 * @author Christoffer Billman
 * @version 1.0
 * @since 2023-04-28
 */
export default function ThemeContextProvider({children}: ThemeContextProviderProps) {

    const [theme, setTheme] = useState<Theme>(lightTheme)

    useEffect(() => {
        document.documentElement.style.setProperty('--text', theme.text)
        document.documentElement.style.setProperty('--background', theme.background)
        document.documentElement.style.setProperty('--muted', theme.muted)
        document.documentElement.style.setProperty('--color', theme.color)
        document.documentElement.style.setProperty('--inverted-text', theme.invertedText)
        document.documentElement.style.setProperty('--gray-70', theme.gray70)
        document.documentElement.style.setProperty('--gray-50', theme.gray50)
        document.documentElement.style.setProperty('--gray-20', theme.gray20)
        document.documentElement.style.setProperty('--gray-10', theme.gray10)
        document.documentElement.style.setProperty('--gray-5', theme.gray5)
    }, [theme])

    return (
        <ThemeContextState.Provider value={theme}>
            <ThemeContextSetter.Provider value={setTheme}>
                {children}
            </ThemeContextSetter.Provider>
        </ThemeContextState.Provider>
    )
}