import Link from "next/link"
import styles from './HeaderNav.module.scss'
import { GoMarkGithub } from "react-icons/go";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import ThemeToggleButton from "../ThemeToggleButton/ThemeToggleButton";




const HeaderNav: React.FC<{  }> = ({ }) => {
    
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [shrinkAmount, setShrinkAmount] = useState(1)
    

    useEffect(() => {
        const scrollHandle = () => setShrinkAmount(1 - (window.scrollY / 450))
        const a = document.addEventListener("scroll", scrollHandle)

        return () => document.removeEventListener("scroll", scrollHandle)
    }, [])





    return (
        <header className={`${styles.header}`}>
            <div className="flex justify-between items-center lg:px-0 px-8 w-full max-w-5xl h-full mx-auto">
                <h1 id={styles.fullname} >
                    E<span style={{ opacity: shrinkAmount, fontSize: shrinkAmount*40 }}>nver </span>
                    <span id={styles.lastname}>
                    S<span style={{ opacity: shrinkAmount, fontSize: shrinkAmount*40 }}>eçilmiş</span>
                    </span>
                </h1>
                <nav className="h-full w-1/2 flex items-center justify-end">


                    <div className="ml-10 h-full w-full hidden md:flex items-center justify-between">
                        <Link href="/">
                            <a>Home</a>
                        </Link>
                        <Link href="/about" >
                            <a>About Me</a>
                        </Link>
                        <Link href="/projects" >
                            <a>Projects</a>
                        </Link>
                        <Link href="/contact" >
                            <a>Contact</a>
                        </Link>
                        <a rel="noopener noreferrer" target={"_blank"} href="https://github.com/enversecilmis">
                            <GoMarkGithub size={20} className="cursor-pointer" />
                        </a>
                    <ThemeToggleButton/>
                    </div>


                    <div className="md:hidden">
                        <button name="open navigation menu" onClick={(e) => setIsMenuOpen(p => !p)}>
                            <div className={`${styles.mobileMenuButton} ${isMenuOpen? styles.mobileMenuButtonOpen : ""}`}></div>
                        </button>
                        <Modal
                            ariaHideApp={false}
                            isOpen={isMenuOpen}
                            onRequestClose={() => setIsMenuOpen(false)}
                            className={`${styles.navModal} ${isMenuOpen? styles.fadeIn:styles.fadeOut}`}
                            overlayClassName={`${styles.navModalOverlay} ${isMenuOpen? styles.fadeIn:styles.fadeOut}`}
                            contentLabel="Navigation Menu"
                            closeTimeoutMS={500}
                        >
                            <Link href="/">
                                <a onClick={() => setIsMenuOpen(false)} className="transition-colors duration-200 hover:text-gray-900 mb-2">Home</a>
                            </Link>
                            <Link href="/about" >
                                <a onClick={() => setIsMenuOpen(false)} className="transition-colors duration-200 hover:text-gray-900 mb-2">About Me</a>
                            </Link>
                            <Link href="/projects" >
                                <a onClick={() => setIsMenuOpen(false)} className="transition-colors duration-200 hover:text-gray-900 mb-2">Projects</a>
                            </Link>
                            <Link href="/contact" >
                                <a onClick={() => setIsMenuOpen(false)} className="transition-colors duration-200 hover:text-gray-900 mb-2">Contact</a>
                            </Link>
                            <a rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)} className="transition-colors duration-200 hover:text-gray-900" target={"_blank"} href="https://github.com/enversecilmis">
                                GitHub
                            </a>
                        </Modal>

                    </div>
                    
                </nav>
            </div>
        </header>
    )
}






export default HeaderNav