import { MouseEventHandler, useState } from "react"
import { BiLoaderAlt } from "react-icons/bi"
import { BsChevronDown, BsWhatsapp } from "react-icons/bs"
import { IoIosCall } from "react-icons/io"
import Modal from "react-modal"
import { useTranslation } from "next-i18next"

import styles from "./ContactButton.module.scss"







const ContactButton: React.FC = () => {
	const { t } = useTranslation("contact-button")
	const [isOpen, setIsOpen] = useState(false)
	const [gradClass, setGradClass] = useState(styles.themeGradient)
	const [isSending, setIsSending] = useState(false)


	const submitFeedBack: MouseEventHandler<HTMLButtonElement> = (e) => {
		e.preventDefault()
		setIsSending(true)
		setTimeout(() => setIsSending(false), 2000)
	}


	return (
		<>
			<button
				title={t("contact")}
				aria-label={t("contact")}
				className={`${styles.button} ${isOpen ? "scaleOut": "scaleIn"}`}
				onClick={() => setIsOpen(true)}
			>
				<IoIosCall size={25}/>
			</button>


			<Modal
				isOpen={isOpen}
				onRequestClose={() => setIsOpen(false)}
				className={`${styles.contactModal} ${gradClass} ${isOpen? "fadeIn":"fadeOut"}`}
				overlayClassName={`${styles.contactModalOverlay}`}
				contentLabel={t("contact")}
				ariaHideApp={false}
				closeTimeoutMS={300}
			>
				<div className={styles.modalHeader}>
					<h5 className={styles.title}>{t("contact")}</h5>
					<button onClick={() => setIsOpen(false)}><BsChevronDown/></button>
				</div>

				<div className={styles.modelContentContainer}>
					<div className={styles.links}>
						<a href="mailto:enversecilmis1@gmail.com">enversecilmis1@gmail.com</a>
						<a href="tel://+905074403027">+90 507 440 3027</a>
						<a href="https://wa.me/905074403027" target="_blank" rel="noreferrer noopener" className={styles.wplink}>
							<BsWhatsapp size={50}/>
						</a>
					</div>

					<div className={styles.lineContainer}>
						<div className={styles.line}></div>
						<span className={styles.lineText}>{t("or")}</span>
						<div className={styles.line}></div>
					</div>

					<form className={styles.emailForm}>
						<div className={styles.inputBox}>
							<input
								id={styles.name}
								className={styles.input}
								placeholder=" "
								spellCheck={false}
								type="text"
								required
								pattern={"[A-Za-z ????????????????????????]+"}
							/>
							<label htmlFor={styles.name}>*{t("name")}</label>
						</div>

						<div className={styles.inputBox}>
							<input
								id={styles.email}
								className={styles.input}
								placeholder=" "
								spellCheck={false}
								type="email"
								required
							/>
							<label htmlFor={styles.email}>*email</label>
						</div>

						<textarea
							className={styles.input}
							placeholder={`*${t("message")}`}
							spellCheck={false}
							required
							rows={3}>
						</textarea>
						<button
							disabled={isSending}
							className={styles.sendButton}
							onClick={submitFeedBack}
							type="submit"
						>
							{isSending? <BiLoaderAlt size={25} className="animate-spin"/> : t("send")}
						</button>
					</form>
				</div>


				<div className={styles.gradientButtons}>
					<button
						onClick={() => setGradClass(styles.themeGradient)}
						className={`${styles.themeGradButton} ${gradClass === styles.themeGradient? "shadow-md scale-110 rotate-45" : "shadow-sm -rotate-45"} transition-all duration-300 w-6 h-6 rounded-full shadow-black mx-2`}
					></button>
				</div>


			</Modal>
		</>
	)
}






export default ContactButton