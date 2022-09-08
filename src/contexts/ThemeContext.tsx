import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react"


type ThemePref = 'system' | 'dark' | 'light' | 'loading'
type NextThemePref = 'system' | 'dark' | 'light' | 'loading'
type SetThemePref = Dispatch<SetStateAction<ThemePref>>

type ContextType = [
    ThemePref,
    SetThemePref,
    NextThemePref
]





const prefs: ThemePref[] = [
    'system',
    'light',
    'dark'
]

const ThemePrefContext = createContext<ContextType | undefined>(undefined)


const ThemePrefProvider: React.FC<{ children?: ReactNode }> = ({ children }) => {
    const [themePref, setThemePref] = useState<ThemePref>('loading')


    useEffect(() => {
        const storedPref = window.localStorage.getItem("theme-preference") as ThemePref
        setThemePref(storedPref)
    }, [])


    useEffect(() => {
        if (themePref !== 'system'){
            document.body.dataset.theme = themePref
            return
        }
        
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        document.body.dataset.theme = mediaQuery.matches ? 'dark' : 'light'

        const themeChangeListener = (event: MediaQueryListEvent) => {
            document.body.dataset.theme = event.matches ? "dark" : "light";
        }

        mediaQuery.addEventListener('change', themeChangeListener)
        return mediaQuery.removeEventListener('change', themeChangeListener)
    }, [themePref])
    


    const idx = prefs.indexOf(themePref)
    const nextIdx = idx+1 === prefs.length ? 0 : idx+1

    
    return (
        <ThemePrefContext.Provider
            value={[
                themePref,
                setThemePref,
                prefs[nextIdx] as ThemePref
            ]}>
            {children}
        </ThemePrefContext.Provider>
    )
}




const useThemePref = () => {
    const themePrefCtx = useContext(ThemePrefContext)

    if (!themePrefCtx)
        throw new Error('No ThemePrefContext.Provider found when calling useThemePref')

    return themePrefCtx
}





export {
    useThemePref,
}

export default ThemePrefProvider