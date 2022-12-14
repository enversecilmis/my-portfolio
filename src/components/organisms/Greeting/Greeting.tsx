import ppImage from "@public/images/pp.jpg"
import Image from "next/legacy/image"
import { useTranslation } from "next-i18next"

import styles from "./Greeting.module.scss"





const Greeting: React.FC = () => {
	const { t } = useTranslation("home")

	return (
		<section className={styles.container}>
			<div className={styles.ppContainer}>
				<Image placeholder="blur" alt="client side rendering" src={ppImage} layout={"fill"} objectFit={"contain"} className={styles.pp} />
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