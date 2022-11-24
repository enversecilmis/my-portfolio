import Link from "next/link"
import { TFunction } from "next-i18next"

import styles from "./ProjectCardLink.module.scss"



type Props = {
    href: string
    tFunction: TFunction
}

const ProjectCardLink: React.FC<Props> = ({
	href,
	tFunction,
}) => {
	tFunction

	return (
		<Link className={styles.projectLinkCard} href={"/projects/dictionary"}>
			<h4 className={styles.cardTitle}>{tFunction<string>("title")}</h4>
			<div className={styles.cardContent}>
				{tFunction<string>("description")}
			</div>
		</Link>
	)
}






export default ProjectCardLink