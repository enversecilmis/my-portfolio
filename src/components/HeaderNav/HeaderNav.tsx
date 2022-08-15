import Link from "next/link"
import styles from './HeaderNav.module.scss'
import { GoMarkGithub } from "react-icons/go";
import { useState } from "react";
import Modal from "react-modal";
import ThemeToggleButton from "../ThemeToggleButton/ThemeToggleButton";
import ShrinkingName from "../ShrinkingName/ShrinkingName";
import BurgerButton from "../BurgerButton/BurgerButton";




const HeaderNav: React.FC<{  }> = ({ }) => {
    
    const [isMenuOpen, setIsMenuOpen] = useState(false)




    return (
        <header className={`${styles.header}`}>
            <div className="flex justify-between items-center lg:px-0 px-8 w-full max-w-5xl h-full mx-auto">
                <ShrinkingName />

                <nav className="h-full w-1/2 flex items-center justify-end">
                    <div className="ml-10 h-full w-full flex items-center justify-end md:justify-between">
                        <Link href="/">
                            <a className="md:inline hidden">Home</a>
                        </Link>
                        <Link href="/projects" >
                            <a className="md:inline hidden">Projects</a>
                        </Link>
                        <a className="md:inline hidden" rel="noopener noreferrer" target={"_blank"} href="https://github.com/enversecilmis">
                            <GoMarkGithub size={20} className="cursor-pointer" />
                        </a>
                        <ThemeToggleButton/>
                        <BurgerButton isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} className="md:hidden ml-10" />
                    </div>


                        <Modal
                            ariaHideApp={false}
                            isOpen={isMenuOpen}
                            onRequestClose={() => setIsMenuOpen(false)}
                            className={`${styles.navModal}`}
                            overlayClassName={`${styles.navModalOverlay}`}
                            contentLabel="Navigation Menu"
                        >
                            <Link href="/">
                                <a onClick={() => setIsMenuOpen(false)} className="transition-colors duration-200 hover:text-gray-900 mb-2">Home</a>
                            </Link>
                            <Link href="/projects" >
                                <a onClick={() => setIsMenuOpen(false)} className="transition-colors duration-200 hover:text-gray-900 mb-2">Projects</a>
                            </Link>
                            <a rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)} className="transition-colors duration-200 hover:text-gray-900" target={"_blank"} href="https://github.com/enversecilmis">
                                GitHub
                            </a>
                        </Modal>

                    
                </nav>
            </div>

        </header>
    )
}






export default HeaderNav