import styles from "./Heading.module.scss"



type Props = {
	hTag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
	headingText: string
}

const Heading: React.FC<Props> = ({
	hTag: HTag,
	headingText,
}) => {
	return (
		<div className={styles.container}>
			<HTag className={styles.heading}>
				{headingText}
			</HTag>
			<div className={styles.headingLine} />
		</div>
	)
}






export default Heading