import { FormEvent, useState } from "react"
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
	const { t: commonT } = useTranslation("common")
	const arrDictDataKey = dictionaryT("arrayDictionary")
	const hashDictDataKey = dictionaryT("hashDictionary")

	const [numberOfSearches, setNumberOfSearches] = useState(20000)
	const [iteration, setIteration] = useState(10)
	const [calculating, setCalculating] = useState(false)
	const [samples, setSamples] = useState<RunTimes[]>([])


	const samplesLineChartData = samples.map(sample => ({
		[arrDictDataKey]: sample.arrRunTime,
		[hashDictDataKey]: sample.hashRunTime,
	}))


	const samplesAverage: RunTimes = calculating ?
		{ arrRunTime: 0, hashRunTime: 0 }:
		averageObject(samples, 0)

	const averageBarChartData = [
		{
			[arrDictDataKey]: samplesAverage.arrRunTime,
			[hashDictDataKey]: samplesAverage.hashRunTime,
		},
	]



	const multiSampleComparison = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setCalculating(true)
		setSamples([])

		for (let i=0; i<iteration; i++){
			const result = await runComparisonWorker(hashDict, arrDict, numberOfSearches)
			setSamples(p => [...p, result])
		}

		setCalculating(false)
	}


	const getFasterSlowerText = () => {
		if (calculating)
			return `${commonT("calculating")}...`
		if (!samplesAverage || !samplesAverage.arrRunTime || !samplesAverage.hashRunTime)
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
			<section className={styles.inputSection}>
				<form
					onSubmit={multiSampleComparison}
					className={styles.labeledInputs}>
					<div className={styles.labeledInput}>
						<label className={styles.label}>
							{dictionaryT("numberOfSearches")}:
						</label>
						<NumberInput
							className={styles.input}
							onChange={setNumberOfSearches}
							value={numberOfSearches}
							disabled={calculating}
							required/>
					</div>
					<div className={styles.labeledInput}>
						<label className={styles.label}>
							{dictionaryT("numberOfIterations")}:
						</label>
						<NumberInput
							className={styles.input}
							onChange={setIteration}
							value={iteration}
							disabled={calculating}
							required/>
					</div>
					<ThemedButton
						className={styles.compareButton}
						label={dictionaryT("compare")}
						type="submit"
						loading={calculating}/>
				</form>

				<p className={styles.compareText}>
					{getFasterSlowerText()}
				</p>
			</section>


			<div className={styles.chartsContainer}>
				<p className={styles.chartTitle}>
					{dictionaryT("allSearchTimeInMs")}
				</p>
				<div className={styles.lineChart}>
					<ResponsiveContainer
						width={"100%"}
						height={250}>
						<LineChart data={samplesLineChartData}>
							<XAxis/>
							<YAxis />
							<Tooltip />
							<Legend />
							<Line
								dataKey={arrDictDataKey}
								dot={false}
								type="monotone"
								stroke="#68b384"/>
							<Line
								dataKey={hashDictDataKey}
								dot={false}
								type="monotone"
								stroke="#8884d8"/>
						</LineChart>
					</ResponsiveContainer>
				</div>


				<p className={styles.chartTitle}>
					{dictionaryT("averageSearchTimeInMs")}
				</p>
				<div className={styles.barChart}>
					<ResponsiveContainer
						width={"100%"}
						height={250}>
						<BarChart
							data={averageBarChartData}>
							<YAxis />
							<Tooltip
								cursor={{ fill: "var(--color-overlay)" }}
								labelStyle={{ display: "none" }}
								wrapperStyle={{ backgroundColor: "red" }}/>
							<Legend />
							<Bar
								dataKey={arrDictDataKey}
								fill="#68b384"/>
							<Bar
								dataKey={hashDictDataKey}
								fill="#8884d8"/>
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	)
}






export default CompareDictionaries