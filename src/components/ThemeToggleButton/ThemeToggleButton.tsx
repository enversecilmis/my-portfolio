import { FiLoader } from "react-icons/fi";
import { BsCircleHalf, BsBrightnessHighFill, BsMoonFill } from "react-icons/bs";
import styles from "./ThemeToggleButton.module.scss"
import { useThemePref } from "../../contexts/ThemeContext";





const buttonIcons = [
    <BsCircleHalf key="systempreficon"  />,
    <BsBrightnessHighFill key="lightpreficon"  />,
    <BsMoonFill key="darkpreficon"  />,
]
const prefs = [
    'system',
    'light',
    'dark'
]




const ThemeToggleButton: React.FC<{ className?: string }> = ({ className }) => {
    const [themePref, setThemePref, nextThemePref] = useThemePref()
    

    if (!themePref)
        return <FiLoader key="prefloadericon"  className="animate-spin" />


    const idx = prefs.indexOf(themePref)
    const ButtonIcon = buttonIcons[idx]

    return (
        <button
            aria-label={`Tema tercihini '${nextThemePref}' olarak ayarla. (şu an: '${themePref}')`}
            title={`Tema tercihini '${nextThemePref}' olarak ayarla. (şu an: '${themePref}')`}
            onClick={() => setThemePref(nextThemePref)}
            className={`${styles.button} ${className}`}
        >
            {ButtonIcon}
        </button>
    )
}






export default ThemeToggleButton