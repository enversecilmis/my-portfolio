import { useEffect, useState } from "react"
import { FiSun, FiMoon } from "react-icons/fi";
import styles from "./ThemeToggleButton.module.scss"



// ************** !!!!!!!!! ******************
//
// TODO: Theme'i local state'ten global state'e taşı 
//
// ************** !!!!!!!!! ******************


const ThemeToggleButton: React.FC<{  }> = ({  }) => {

    const [activeTheme, setActiveTheme] = useState("")
    const inactiveTheme = activeTheme === "light" ? "dark" : "light"



    useEffect(() => {
        const savedTheme = window.localStorage.getItem("theme")
        if(savedTheme)
            setActiveTheme(savedTheme)
    }, [])

    useEffect(() => {
        if(!activeTheme) return

        document.body.dataset.theme = activeTheme
        window.localStorage.setItem("theme", activeTheme)
    }, [activeTheme])



    const toggleTheme = () => setActiveTheme(inactiveTheme)
    const ButtonIcon = activeTheme === "dark"? <FiMoon size={25} /> : <FiSun size={25} />

    return (
        <button
            aria-label={`Change to ${inactiveTheme} mode`}
            title={`Change to ${inactiveTheme} mode`}
            onClick={toggleTheme}
        >
            {ButtonIcon}
        </button>
    )
}






export default ThemeToggleButton