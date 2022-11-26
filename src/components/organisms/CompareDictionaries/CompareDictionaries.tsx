import { useState } from "react"

import { DictionaryArray, DictionaryHashTable } from "../../../projects-src/hashtabledict/types"
import { rndNum } from "../../../utils/random-number"
import ThemedButton from "../../atoms/ThemedButton/ThemedButton"

import styles from "./CompareDictionaries.module.scss"


const runTimeComparison = (
	func1: (index: number) => void,
	func2: (index: number) => void,
	iterations = 100,
) => {
	let dateBefore = Date.now()

	for (let i = 0; i < iterations; i++)
		func1(i)
	const runTime1 = Date.now() - dateBefore

	dateBefore = Date.now()
	for (let i = 0; i < iterations; i++)
		func2(i)
	const runtime2 = Date.now() - dateBefore

	return { runTime1, runtime2 }
}
const calculateRunTime = (func: (iteration: number) => void, iterations = 1) => {
	const dateBefore = Date.now()

	for (let i = 0; i < iterations; i++)
		func(i)
	const runTime = Date.now() - dateBefore

	return runTime
}




type Props = {
    dictionary: DictionaryArray
    hashDictionary: DictionaryHashTable
}
type RunTimes = {
    dictSeqTime: number
    dictRandTime: number
    hashSeqTime: number
    hashRandTime: number
}

const CompareDictionaries: React.FC<Props> = ({
	dictionary,
	hashDictionary,
}) => {
	const [runTimes, setRunTimes] = useState<RunTimes>()


	const runTest = async () => {
		const searchInDictionary = (word: string) => {
			return dictionary.filter(pair => pair[0] === word)[0][1] || ""
		}

		const searchableWords = dictionary.map((pair) => pair[0])
		const wordCount = searchableWords.length

		// Sequential search run times (from start to finish).
		const dictSeqTime = calculateRunTime(
			(i) => searchInDictionary(searchableWords[i]),
			wordCount,
		)
		// Random search run times.
		const dictRandTime = calculateRunTime(
			(i) => searchInDictionary(searchableWords[rndNum(0, wordCount)]),
			wordCount,
		)
		const hashSeqTime = calculateRunTime(
			(i) => hashDictionary.search(searchableWords[i]),
			wordCount,
		)
		const hashRandTime = calculateRunTime(
			(i) => hashDictionary.search(searchableWords[rndNum(0, wordCount)]),
		)

		setRunTimes({
			dictRandTime,
			dictSeqTime,
			hashRandTime,
			hashSeqTime,
		})
	}

	return (
		<div className={styles.container}>
			<ThemedButton
				label="Run Test"
				onClick={runTest}
			/>

		</div>
	)
}






export default CompareDictionaries