import { useState } from "react"
import { IoChevronDown, IoLanguage } from "react-icons/io5"
import Tr from "@public/images/tr.svg"
import Us from "@public/images/us.svg"
import Image from "next/legacy/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"

import styles from "./LanguagePicker.module.scss"



// TODO: Cookie for language prefference
// TODO: Change language without refreshing and adding to history
// const setCookie = (locale: string) => {
// 	document.cookie = `NEXT_LOCALE=${locale}; max-age=31536000; path=/`
// }

type Props = {
	className?: string
}
const LanguagePicker: React.FC<Props> = ({ className }) => {
	const { asPath, locale } = useRouter()
	const { t } = useTranslation("header")
	const [isOpen, setIsOpen] = useState(false)


	return (
		<div
			className={styles.container}
			onBlur={() => setIsOpen(false)}
			onKeyDown={(e) => { if (e.key === "Escape")
				setIsOpen(false) }}
		>
			<button
				onClick={() => setIsOpen(p => !p)}
				className={`${styles.button} ${className}`}
				title={t("selectLanguage")}
			>
				<IoLanguage size={20} />
				<IoChevronDown size={20}/>
			</button>

			<div
				className={`${styles.languageList} ${isOpen? styles.open : styles.closed}`}
				onFocus={() => setIsOpen(true)}
			>
				<div className={styles.arrowBox}></div>
				<Link
					onClick={() => {
						document.cookie = "NEXT_LOCALE=tr; max-age=31536000; path=/"
					}}
					replace={true}
					key={"tr"}
					href={asPath}
					locale={"tr"}
					scroll={false}
					className={`${styles.link} ${locale === "tr"? styles.currentLocale:""}`}
					lang="tr"
					hrefLang="tr">

					<Image alt="flag" height={20} width={27} objectFit="contain" src={Tr.src} />
					<span>Türkçe</span>
				</Link>
				<Link
					onClick={() => {
						document.cookie = "NEXT_LOCALE=en; max-age=31536000; path=/"
					}}
					replace={true}
					key={"en"}
					href={asPath}
					locale={"en"}
					scroll={false}
					className={`${styles.link} ${locale === "en"? styles.currentLocale:""}`}
					lang="en"
					hrefLang="en">

					<Image alt="flag" height={20} width={27} src={Us.src} />
					<span>English</span>

				</Link>
			</div>
		</div>
	)
}






export default LanguagePicker