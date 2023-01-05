import { CSSProperties } from "react"

import styles from "./MaskedStars.module.scss"



type Props = {
	percentage: number
	numberOfStars: number
	className?: string
}

const MaskedStars: React.FC<Props> = ({
	percentage,
	numberOfStars,
	className,
}) => {
	const stars = (new Array(numberOfStars)).fill("★").join("")
	return (
		<div
			style={{
				"--rating-percentage": `${percentage}%`,
			} as CSSProperties}
			className={`${styles.container} ${className}`}>
			<p className={styles.star}>
				{stars}
			</p>
		</div>
	)
}






export default MaskedStars