import { useState } from "react"
import Modal from "react-modal"
import AccountButton from "@components/atoms/AccountButton/AccountButton"
import BurgerButton from "@components/atoms/BurgerButton/BurgerButton"
import ThemeToggleButton from "@components/atoms/ThemeToggleButton/ThemeToggleButton"
import LanguagePicker from "@components/molecules/LanguagePicker/LanguagePicker"
import ShrinkingName from "@components/molecules/ShrinkingName/ShrinkingName"
import Link from "next/link"
import { useTranslation } from "next-i18next"

import styles from "./HeaderNav.module.scss"



const HeaderNav: React.FC = () => {
	const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
	const { t } = useTranslation("common")


	return (
		<header className={`${styles.header}`}>
			<div className={styles.innerContainer}>
				<ShrinkingName />

				<nav className={styles.largeScreenNav}>
					<Link href="/" className={styles.link}>
						{t("home")}
					</Link>
					<Link href="/projects" className={styles.link}>
						{t("projects")}
					</Link>
					<a
						className={styles.link}
						rel="noopener noreferrer"
						target={"_blank"}
						href="https://github.com/enversecilmis"
					>
                        GitHub
					</a>
					<LanguagePicker className={styles.link}/>
					<ThemeToggleButton className={styles.link}/>
					<AccountButton className={styles.link} />
				</nav>


				<BurgerButton isOpen={isMobileNavOpen} setIsOpen={setIsMobileNavOpen} className={styles.burgerButton} />
				<Modal
					ariaHideApp={false}
					isOpen={isMobileNavOpen}
					onRequestClose={() => setIsMobileNavOpen(false)}
					className={`${styles.navModalContainer}`}
					overlayClassName={styles.navModalOverlay}
					contentLabel={t("contentLabel")}
					closeTimeoutMS={300}
				>
					<nav className={`${styles.mobileNav} ${isMobileNavOpen? styles.fadeIn:styles.fadeOut}`}>
						<Link className={styles.link} href="/" onClick={() => setIsMobileNavOpen(false)}>
							{t("home")}
						</Link>
						<Link className={styles.link} href="/projects" onClick={() => setIsMobileNavOpen(false)}>
							{t("projects")}
						</Link>
						<a className={styles.link} rel="noopener noreferrer" onClick={() => setIsMobileNavOpen(false)} target={"_blank"} href="https://github.com/enversecilmis">
                            GitHub
						</a>
						<div className={styles.configs}>
							<LanguagePicker className={styles.link}/>
							<ThemeToggleButton className={styles.link}/>
							<AccountButton className={styles.link} />
						</div>
					</nav>
				</Modal>
			</div>

		</header>
	)
}






export default HeaderNav