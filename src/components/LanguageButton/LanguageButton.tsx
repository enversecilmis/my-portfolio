import styles from './LanguageButton.module.scss'
import { IoLanguage, IoChevronDown } from "react-icons/io5";
import Link from 'next/link';
import { useRouter } from 'next/router';






const LanguageButton: React.FC<{ className?: string }> = ({ className }) => {

	const { asPath, locales, locale } = useRouter()

	return (
		<div  className={`${styles.container} ${className}`}>
			<IoLanguage />
			<IoChevronDown />

			<div className={styles.languagesContainer}>
				{locales?.map((val) => (
					<Link key={val} href={asPath} locale={val} scroll={false}>
						<a className={`${styles.localeOption} ${val === locale ? styles.currentLocale:""}`}>
							{val}
						</a>
					</Link>
				))}
			</div>
		</div>
	)
}






export default LanguageButton