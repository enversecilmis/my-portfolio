import Image from "next/legacy/image"
import { useTranslation } from "next-i18next"

import styles from "./Greeting.module.scss"





const Greeting: React.FC = () => {
	const { t } = useTranslation("home")

	return (
		<section className={styles.container}>
			<div className={styles.ppContainer}>
				<Image src="/images/pp.jpg" alt="profile picture" layout={"fill"} objectFit={"contain"} className={styles.pp} />
			</div>
			<div className={styles.introText}>
				<p className={styles.title}>Hello World!</p>
				<p className={styles.text}>
					{t("intro")}
				</p>
			</div>
		</section>
	)
}






export default Greeting