import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"



type ContextType = [
    string,
    Dispatch<SetStateAction<string>>
]



const ThemePrefContext = createContext<ContextType | undefined>(undefined)


const ThemePrefProvider: React.FC<{ children?: ReactNode }> = ({ children }) => {
    const [value, setValue] = useState('')
    
    return (
        <ThemePrefContext.Provider value={[value, setValue]}>
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