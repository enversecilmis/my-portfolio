import { useMemo } from "react"
import { useTranslation } from "next-i18next"
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from "recharts"

import { getStats } from "../../utils/get-stats"

import styles from "./StatDisplay.module.scss"


type Props = {
    array: number[]
    fractionDigits?: number
}

const StatDisplay: React.FC<Props> = ({
	array,
	fractionDigits,
}) => {
	const { t: dictionaryT } = useTranslation("dictionary")
	const stats = useMemo(() => getStats(array, fractionDigits), [array, fractionDigits])
	const histData = stats.histogram.map((val, idx) => ({
		[dictionaryT("collisionsTag")]: idx,
		[dictionaryT("occurenceTag")]: val,
	}))

	return (
		<div className={styles.container}>
			<div className={styles.basicStatistics}>
				<div className={styles.tableTitle}>
					{dictionaryT("basicStatistics")}
				</div>
				<div className={styles.statTable}>
					<div className={styles.labelColumn}>
						<span className={styles.statLabel}>{dictionaryT("averageCollision")}</span>
						<span className={styles.statLabel}>{dictionaryT("maxCollisions")}</span>
						<span className={styles.statLabel}>{dictionaryT("minCollisions")}</span>
						<span className={styles.statLabel}>{dictionaryT("standardDeviation")}</span>
						<span className={styles.statLabel}>{dictionaryT("totalCollisions")}</span>
					</div>
					<div className={styles.valueColumn}>
						<span className={styles.statValue}>{stats.average}</span>
						<span className={styles.statValue}>{stats.max}</span>
						<span className={styles.statValue}>{stats.min}</span>
						<span className={styles.statValue}>{stats.standardDeviation}</span>
						<span className={styles.statValue}>{stats.total}</span>
					</div>
				</div>

			</div>
			<div className={styles.histogram}>
				<div className={styles.chartTitle}>
					{dictionaryT("collisionsHistogram")}
				</div>
				<div className={styles.barChart}>
					<BarChart
						width={120*histData.length}
						height={300}
						data={histData}
						margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
					>
						<XAxis dataKey={dictionaryT("collisionsTag")} />
						<YAxis dataKey={dictionaryT("occurenceTag")}/>
						<Legend/>
						<Tooltip cursor={{ fill: "var(--color-overlay-2)" }}/>
						<Bar dataKey={dictionaryT("occurenceTag")} fill="#8884d8" background={{ fill: "var(--color-overlay)" }}/>
					</BarChart>
				</div>
			</div>

		</div>
	)
}






export default StatDisplay