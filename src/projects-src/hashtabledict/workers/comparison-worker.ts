import { ArrayDictionary, HashTableDictionary } from "../hashtabledict"
import { DictionaryArray, TableArray } from "../types"
import measureRunTime from "../utils/measure-run-time"
import { rndNum } from "../utils/random-number"




export type ComparisonWorkerData = {
	dictArr: DictionaryArray,
	hashDictInitData: {
		tableArray: TableArray
		hFString: string
		cFString: string
		throwCollisionLoopError: boolean
	},
	iteration: number
}

export type ComparisonWorkerReturnData = {
	arrRunTime: number,
	hashRunTime: number,
}


onmessage = function(event: MessageEvent<ComparisonWorkerData>) {
	const { dictArr, hashDictInitData, iteration } = event.data

	const hashDictOptions = {
		hashFunction: eval(hashDictInitData.hFString),
		collisionHandler: eval(hashDictInitData.cFString),
		throwCollisionLoopError: hashDictInitData.throwCollisionLoopError,
	}

	// Recreate objects.
	const arrDict = new ArrayDictionary(dictArr)
	const hashDict = new HashTableDictionary(hashDictInitData.tableArray, hashDictOptions)


	const searchableWords = arrDict.dictArray.map((pair) => pair[0])
	const wordCount = arrDict.dictArray.length


	const arrRunTime = measureRunTime(
		() => arrDict.search(searchableWords[rndNum(0, wordCount)]),
		iteration,
	)
	const hashRunTime = measureRunTime(
		() => hashDict.search(searchableWords[rndNum(0, wordCount)]),
		iteration,
	)


	postMessage({
		arrRunTime,
		hashRunTime,
	})
}