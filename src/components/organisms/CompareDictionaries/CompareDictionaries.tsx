import { useState } from "react"
import NumberInput from "@components/atoms/NumberInput/NumberInput"
import averageObject from "@utils/average-object"
import { useTranslation } from "next-i18next"
import { Bar, BarChart, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { ArrayDictionary, HashTableDictionary } from "../../../projects-src/hashtabledict/hashtabledict"
import runComparisonWorker from "../../../projects-src/hashtabledict/utils/run-comparison-worker"
import ThemedButton from "../../atoms/ThemedButton/ThemedButton"

import styles from "./CompareDictionaries.module.scss"




type Props = {
    arrDict: ArrayDictionary
    hashDict: HashTableDictionary
}
type RunTimes = {
    arrRunTime: number
    hashRunTime: number
}



const CompareDictionaries: React.FC<Props> = ({
	arrDict,
	hashDict,
}) => {
	const { t: dictionaryT } = useTranslation("dictionary")
	const arrDictDataKey = dictionaryT("arrayDictionary")
	const hashDictDataKey = dictionaryT("hashDictionary")

	const [iteration, setIteration] = useState(20000)
	const [calculating, setCalculating] = useState(false)
	const [samples, setSamples] = useState<RunTimes[]>([])


	const samplesAverage: RunTimes = calculating ?
		{ arrRunTime: 0, hashRunTime: 0 }:
		averageObject(samples, 0)


	const averageBarChartData = [
		{
			[arrDictDataKey]: samplesAverage.arrRunTime,
			[hashDictDataKey]: samplesAverage.hashRunTime,
		},
	]
	const samplesLineChartData = samples.map(sample => ({
		[arrDictDataKey]: sample.arrRunTime,
		[hashDictDataKey]: sample.hashRunTime,
	}))





	const multiSampleComparison = async () => {
		setCalculating(true)
		setSamples([])

		const sampleSize = 20
		for (let i=0; i<sampleSize; i++){
			const result = await runComparisonWorker(hashDict, arrDict, iteration)
			setSamples(p => [...p, result])
		}

		setCalculating(false)
	}


	const getFasterSlowerText = () => {
		if (calculating)
			return "Calculating..."
		if (!samplesAverage || samplesAverage.arrRunTime === 0 || samplesAverage.hashRunTime === 0)
			return null

		const arrHashRatio = samplesAverage.arrRunTime / samplesAverage.hashRunTime
		const hashFaster = arrHashRatio > 1

		const ratio = hashFaster ?
			arrHashRatio:
			Math.pow(arrHashRatio, -1)

		return hashFaster ?
			`${dictionaryT("searchingInHashTable")} ${ratio.toFixed(0)} ${dictionaryT("timesFaster")}`:
			`${dictionaryT("searchingInHashTable")} ${ratio.toFixed(0)} ${dictionaryT("timesSlower")}`
	}



	return (
		<div className={styles.container}>


			<div className={styles.comparisonContainer}>
				<h6 className={styles.comparisonTitle}>
					{dictionaryT("randomSearchComparison")}
				</h6>
				<div className={styles.iterationInput}>
					<p>{dictionaryT("numberOfSearches")}:</p>
					<NumberInput
						onChange={setIteration}
						value={iteration}
					/>
				</div>
				<ThemedButton
					label={dictionaryT("compare")}
					onClick={multiSampleComparison}
					loading={calculating}
					className={styles.compareButton}
				/>
				<ResponsiveContainer width={"100%"} height={250}>
					<LineChart
						data={samplesLineChartData}
						margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
					>
						<XAxis/>
						<YAxis />
						<Tooltip />
						<Legend />
						<Line
							dataKey={arrDictDataKey}
							dot={false}
							type="monotone"
							stroke="#68b384"
						/>
						<Line
							dataKey={hashDictDataKey}
							dot={false}
							type="monotone"
							stroke="#8884d8"
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>


			<div className={styles.comparisonContainer}>
				<p className={styles.chartTitle}>
					{dictionaryT("searchTimeInMs")}
				</p>
				<ResponsiveContainer width={"100%"} height={250}>
					<BarChart
						data={averageBarChartData}
					>
						<YAxis />
						<Tooltip
							cursor={{ fill: "var(--color-overlay)" }}
							labelStyle={{ display: "none" }}
							wrapperStyle={{ backgroundColor: "red" }}
						/>
						<Legend />
						<Bar
							dataKey={arrDictDataKey}
							fill="#68b384"
						/>
						<Bar
							dataKey={hashDictDataKey}
							fill="#8884d8"
						/>
					</BarChart>
				</ResponsiveContainer>
				<p className={styles.compareText}>
					{getFasterSlowerText()}
				</p>
			</div>




		</div>
	)
}






export default CompareDictionaries