import { FiLoader } from "react-icons/fi";
import { BsCircleHalf, BsBrightnessHighFill, BsMoonFill } from "react-icons/bs";
import styles from "./ThemeToggleButton.module.scss"
import { useThemePref } from "../../contexts/ThemeContext";
import { useTranslation } from "next-i18next";





const buttonIcons = {
    system: <BsCircleHalf key="systempreficon"  />,
    light: <BsBrightnessHighFill key="lightpreficon"  />,
    dark: <BsMoonFill key="darkpreficon"  />,
}


type Props = {
    className?: string
}

const ThemeToggleButton: React.FC<Props> = ({
    className
}) => {
    const [themePref, setThemePref, nextThemePref] = useThemePref()
    const { t } = useTranslation('header')
    

    if (!themePref || !nextThemePref)
        return <FiLoader key="prefloadericon"  className="animate-spin" />


    const ButtonIcon = buttonIcons[themePref]
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