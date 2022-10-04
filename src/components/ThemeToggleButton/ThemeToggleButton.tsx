import { FiLoader } from "react-icons/fi";
import { BsCircleHalf, BsBrightnessHighFill, BsMoonFill } from "react-icons/bs";
import styles from "./ThemeToggleButton.module.scss"
import { useThemePref } from "../../contexts/ThemeContext";
import { useTranslation } from "next-i18next";





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
    const { t } = useTranslation('header')
    

    if (!themePref || !nextThemePref)
        return <FiLoader key="prefloadericon"  className="animate-spin" />


    const idx = prefs.indexOf(themePref)
    const ButtonIcon = buttonIcons[idx]

    return (
        <button
            aria-label={`${t('changeTheme')} ${t(nextThemePref)}`}
            title={`${t('changeTheme')} ${t(nextThemePref)}`}
            onClick={() => setThemePref(nextThemePref)}
            className={`${styles.button} ${className}`}
        >
            {ButtonIcon}
        </button>
    )
}






export default ThemeToggleButton