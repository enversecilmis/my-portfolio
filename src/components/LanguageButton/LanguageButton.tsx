import styles from './LanguageButton.module.scss'
import { IoLanguage, IoChevronDown } from "react-icons/io5";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

import Tr from '../../../public/tr.svg';
import Us from '../../../public/us.svg';
import Image from 'next/image';





const LanguageButton: React.FC<{ className?: string }> = ({ className }) => {
	const { asPath, locale } = useRouter()
	const { t } = useTranslation('header')
	const [isOpen, setIsOpen] = useState(false)
	

	return (
		<div
			className={styles.container}
			onFocus={() => console.log("cont focus")}
			onBlur={() => setIsOpen(false)}
			onKeyDown={(e) => {if(e.key === "Escape") setIsOpen(false)}}
		>
			<button
				onClick={() => setIsOpen(p => !p)}
				className={styles.button}
				title={t('selectLanguage')}
			>
				<IoLanguage size={20} />
				<IoChevronDown size={20}/>
			</button>

			<div
				className={`${styles.languageList} ${isOpen? styles.open : styles.closed}`}
				onFocus={() => setIsOpen(true)}
				onBlur={() => console.log("list blur")}
			>
				<div className={styles.arrowBox}></div>
				<Link key={'tr'} href={asPath} locale={'tr'} scroll={false}>
					<a
						className={`${styles.link} ${locale === 'tr'? styles.currentLocale:""}`}
						lang='tr'
						hrefLang='tr'
					>
						<Image alt='flag' height={20} width={27} objectFit='contain' src={Tr.src} />
						<span>Türkçe</span>
					</a>
				</Link>
				<Link key={'en'} href={asPath} locale={'en'} scroll={false}>
					<a
						className={`${styles.link} ${locale === 'en'? styles.currentLocale:""}`}
						lang='en'
						hrefLang='en'
					>
						<Image alt='flag' height={20} width={27} src={Us.src} />
						<span>English</span>
					</a>
				</Link>
			</div>
		</div>
	)
}






export default LanguageButton