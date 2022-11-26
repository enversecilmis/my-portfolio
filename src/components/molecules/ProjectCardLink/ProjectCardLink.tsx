import Link from "next/link"

import styles from "./ProjectCardLink.module.scss"



type Props = {
    href: string
	description: string
	title: string
}

const ProjectCardLink: React.FC<Props> = ({
	href,
	title,
	description,
}) => {
	return (
		<Link className={styles.projectLinkCard} href={href}>
			<h4 className={styles.cardTitle}>{title}</h4>
			<div className={styles.cardContent}>
				{description}
			</div>
		</Link>
	)
}






export default ProjectCardLink