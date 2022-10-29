import Link from "next/link"
import styles from './HeaderNav.module.scss'
import { useState } from "react";
import Modal from "react-modal";
import ThemeToggleButton from "../ThemeToggleButton/ThemeToggleButton";
import ShrinkingName from "../ShrinkingName/ShrinkingName";
import BurgerButton from "../BurgerButton/BurgerButton";
import LanguageButton from "../LanguageButton/LanguageButton";
import { useTranslation } from "next-i18next";



const HeaderNav: React.FC<{  }> = ({ }) => {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
    const { t } = useTranslation("header")


    return (
        <header className={`${styles.header}`}>
            <div className={styles.innerContainer}>
                <ShrinkingName />

                <nav className={styles.largeScreenNav}>
                    <Link href="/" className={styles.link}>
                        {t('home')}
                    </Link>
                    <Link href="/projects" className={styles.link}>
                        {t('projects')}
                    </Link>
                    <a
                        className={styles.link}
                        rel="noopener noreferrer"
                        target={"_blank"}
                        href="https://github.com/enversecilmis"
                    >
                        GitHub
                    </a>
                    <LanguageButton/>
                    <ThemeToggleButton/>
                </nav>


                <BurgerButton isOpen={isMobileNavOpen} setIsOpen={setIsMobileNavOpen} className={styles.burgerButton} />
                <Modal
                    ariaHideApp={false}
                    isOpen={isMobileNavOpen}
                    onRequestClose={() => setIsMobileNavOpen(false)}
                    className={`${styles.navModalContainer}`}
                    overlayClassName={styles.navModalOverlay}
                    contentLabel={t('contentLabel')}
                    closeTimeoutMS={300}
                >
                    <nav className={`${styles.mobileNav} ${isMobileNavOpen? styles.fadeIn:styles.fadeOut}`}>
                        <Link href="/" onClick={() => setIsMobileNavOpen(false)}>
                            {t('home')}
                        </Link>
                        <Link href="/projects" onClick={() => setIsMobileNavOpen(false)}>
                            {t('projects')}
                        </Link>
                        <a rel="noopener noreferrer" onClick={() => setIsMobileNavOpen(false)} target={"_blank"} href="https://github.com/enversecilmis">
                            GitHub
                        </a>
                        <div className={styles.configs}>
                            <LanguageButton/>
                            <ThemeToggleButton className={styles.themeButton}/>
                        </div>
                    </nav>
                </Modal>
            </div>

        </header>
    );
}






export default HeaderNav