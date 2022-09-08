import Link from "next/link"
import styles from './HeaderNav.module.scss'
import { useState } from "react";
import Modal from "react-modal";
import ThemeToggleButton from "../ThemeToggleButton/ThemeToggleButton";
import ShrinkingName from "../ShrinkingName/ShrinkingName";
import BurgerButton from "../BurgerButton/BurgerButton";




const HeaderNav: React.FC<{  }> = ({ }) => {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)


    return (
        <header className={`${styles.header}`}>
            <div className={styles.innerContainer}>
                <ShrinkingName />

                <nav className={styles.largeScreenNav}>
                    <Link href="/">
                        <a>Ana Sayfa</a>
                    </Link>
                    <Link href="/projects" >
                        <a>Projeler</a>
                    </Link>
                    <a rel="noopener noreferrer" target={"_blank"} href="https://github.com/enversecilmis">
                        GitHub
                    </a>
                    <ThemeToggleButton/>
                </nav>


                <BurgerButton isOpen={isMobileNavOpen} setIsOpen={setIsMobileNavOpen} className={styles.burgerButton} />
                <Modal
                    ariaHideApp={false}
                    isOpen={isMobileNavOpen}
                    onRequestClose={() => setIsMobileNavOpen(false)}
                    className={`${styles.navModalContainer}`}
                    overlayClassName={styles.navModalOverlay}
                    contentLabel="Navigation Menu"
                    closeTimeoutMS={300}
                >
                    <nav className={`${styles.mobileNav} ${isMobileNavOpen? styles.fadeIn:styles.fadeOut}`}>
                        <Link href="/">
                            <a onClick={() => setIsMobileNavOpen(false)}>Home</a>
                        </Link>
                        <Link href="/projects" >
                            <a onClick={() => setIsMobileNavOpen(false)}>Projects</a>
                        </Link>
                        <a rel="noopener noreferrer" onClick={() => setIsMobileNavOpen(false)} target={"_blank"} href="https://github.com/enversecilmis">
                            GitHub
                        </a>
                        <ThemeToggleButton className={styles.themeButton}/>
                    </nav>
                </Modal>
            </div>

        </header>
    )
}






export default HeaderNav