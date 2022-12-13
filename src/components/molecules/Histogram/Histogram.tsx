import { useMemo } from "react"
import { getStats } from "@utils/get-stats"
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from "recharts"

import styles from "./Histogram.module.scss"



type Props = {
    array: number[]
    fractionDigits?: number
	title?: string
	tagX: string
	tagY: string
}

const Histogram: React.FC<Props> = ({
	array,
	fractionDigits,
	title,
	tagX,
	tagY,
}) => {
	const stats = useMemo(() => getStats(array, fractionDigits), [array, fractionDigits])
	const histData = stats.histogram.map((val, idx) => ({
		[tagX]: idx,
		[tagY]: val,
	}))

	return (
		<div className={styles.histogram}>
			<div className={styles.chartTitle}>
				{title}
			</div>
			<div className={styles.barChartContainer}>
				<BarChart
					className={styles.barChart}
					width={70*histData.length}
					height={300}
					data={histData}
					margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
				>
					<XAxis dataKey={tagX} />
					<YAxis dataKey={tagY}/>
					<Legend/>
					<Tooltip cursor={{ fill: "var(--color-overlay-2)" }}/>
					<Bar width={5} dataKey={tagY} fill="#8884d8" background={{ fill: "var(--color-overlay)" }}/>
				</BarChart>
			</div>
		</div>
	)
}






export default Histogram