import { useMemo } from "react"
import { getStats } from "@utils/get-stats"
import { useTranslation } from "next-i18next"

import styles from "./BasicStats.module.scss"



type Props = {
	title?: string
    array: number[]
    fractionDigits?: number
	postfix?: string
}

const BasicStats: React.FC<Props> = ({
	title,
	array,
	fractionDigits,
	postfix,
}) => {
	const { t: commonT } = useTranslation("common")

	const stats = useMemo(
		() => getStats(array, fractionDigits),
		[array, fractionDigits],
	)

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				{title && commonT("basicStats")}
			</div>
			<div className={styles.table}>
				<div className={`${styles.column} ${styles.labelColumn}`}>
					<span className={styles.value}>{commonT("average")} {postfix}</span>
					<span className={styles.value}>{commonT("max")} {postfix}</span>
					<span className={styles.value}>{commonT("min")} {postfix}</span>
					<span className={styles.value}>{commonT("standardDeviation")}</span>
					<span className={styles.value}>{commonT("total")} {postfix}</span>
				</div>
				<div className={styles.column}>
					<span className={styles.value}>{stats.average}</span>
					<span className={styles.value}>{stats.max}</span>
					<span className={styles.value}>{stats.min}</span>
					<span className={styles.value}>{stats.standardDeviation}</span>
					<span className={styles.value}>{stats.total}</span>
				</div>
			</div>

		</div>
	)
}






export default BasicStats