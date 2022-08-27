import { useEffect, useState } from "react"
import { FiLoader } from "react-icons/fi";
import { BsCircleHalf, BsBrightnessHighFill, BsMoonFill } from "react-icons/bs";
import styles from "./ThemeToggleButton.module.scss"


// ************** !!!!!!!!! ******************
//
// TODO: Theme'i local state'ten global state'e taşı 
//
// ************** !!!!!!!!! ******************
const themeChangeListener = (event: MediaQueryListEvent) => {
	document.body.dataset.theme = event.matches ? "dark" : "light";
}
const buttons = [ <BsCircleHalf size={25} />, <BsBrightnessHighFill size={25} />, <BsMoonFill size={25} />]
const prefs = ['system', 'light', 'dark']




const ThemeToggleButton: React.FC<{  }> = ({  }) => {
    const [themePref, setThemePref] = useState("")
    


    useEffect(() => {
        const storedPref = window.localStorage.getItem("theme-preference") as string
        setThemePref(storedPref)
    }, [])


    useEffect(() => {
        if (themePref !== 'system'){
            document.body.dataset.theme = themePref
            return
        }
        
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        document.body.dataset.theme = mediaQuery.matches ? 'dark' : 'light'

        mediaQuery.addEventListener('change', themeChangeListener)
        return mediaQuery.removeEventListener('change', themeChangeListener)
    }, [themePref])


    const idx = prefs.indexOf(themePref)
    const nextIdx = idx+1 === prefs.length ? 0 : idx+1
    const ButtonIcon = buttons[idx]

    const setNextPref = () => {
        const nextPref = prefs[nextIdx] as string
        setThemePref(nextPref)
        window.localStorage.setItem("theme-preference", nextPref)
    }



    if (!themePref) return <FiLoader size={25} className="animate-spin" />
        

    return (
        <button
            aria-label={`Change theme preference to ${prefs[nextIdx]}`}
            title={`Change theme preference to ${prefs[nextIdx]}`}
            onClick={setNextPref}
        >
            {ButtonIcon}
        </button>
    )
}






export default ThemeToggleButton