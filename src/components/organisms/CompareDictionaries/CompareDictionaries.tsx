import { useState } from "react"
import NumberInput from "@components/atoms/NumberInput/NumberInput"
import { useTranslation } from "next-i18next"
import { Bar, BarChart, Legend, Tooltip, YAxis } from "recharts"

import { ArrayDictionary, HashTableDictionary } from "../../../projects-src/hashtabledict/hashtabledict"
import compareDictionaries from "../../../projects-src/hashtabledict/workers/comparison-worker"
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
	const [runTimes, setRunTimes] = useState<RunTimes>({ arrRunTime: 0, hashRunTime: 0 })
	const [iteration, setIteration] = useState(20000)
	const [calculating, setCalculating] = useState(false)
	const { t: dictionaryT } = useTranslation("dictionary")



	const runComparisonWorker = async () => {
		setCalculating(true)

		const result = await compareDictionaries(arrDict, hashDict, iteration)


		// File worker. (better?)
		// const wrkr = new Worker(new URL("../../../projects-src/hashtabledict/workers/compare-worker.ts", import.meta.url))
		// wrkr.onmessage = (event: MessageEvent<{arrRunTime: number, hashRunTime: number }>) => {
		// 	console.log("message from worker", event.data)
		// 	setRunTimes(event.data)
		// }
		// const wData = {
		// 	arrDict: dictionary,
		// 	hashDictData: {
		// 		arr: hashDict.tableArray,
		// 		hFString: hashDict.hashFunction.toString(),
		// 		cFString: hashDict.collisionHandler.toString(),
		// 	},
		// 	iteration: iteration,
		// }
		// wrkr.postMessage(wData)


		setRunTimes(result)
		setCalculating(false)
	}

	const arrDictDataKey = dictionaryT("arrayDictionary")
	const hashDictDataKey = dictionaryT("hashDictionary")
	const chartData = [
		{
			[arrDictDataKey]: runTimes.arrRunTime,
			[hashDictDataKey]: runTimes.hashRunTime,
		},
	]

	return (
		<div className={styles.container}>

			<h6 className={styles.testTitle}>{dictionaryT("randomSearchComparison")}</h6>

			<div className={styles.comparisonContainer}>
				<div className={styles.iterationInput}>
					<p>{dictionaryT("numberOfSearches")}:</p>
					<NumberInput
						onChange={setIteration}
						value={iteration}
					/>
				</div>
				<ThemedButton
					label={dictionaryT("compare")}
					onClick={runComparisonWorker}
					loading={calculating}
					className={styles.compareButton}
				/>
				<p className={styles.chartTitle}>{dictionaryT("searchTimeInMs")}</p>
				<BarChart width={230} height={250} data={chartData} title="Milisaniye cinsinden arama hızları">
					<YAxis />
					<Tooltip cursor={{ fill: "var(--color-overlay)" }} labelStyle={{ display: "none" }} wrapperStyle={{ backgroundColor: "red" }}/>
					<Legend />
					<Bar dataKey={arrDictDataKey} fill="#68b384" />
					<Bar dataKey={hashDictDataKey} fill="#8884d8" />
				</BarChart>
			</div>

		</div>
	)
}






export default CompareDictionaries