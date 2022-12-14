import webwork from "@kolodny/webwork"

import { CollisionHandler, DictionaryArray, DictionaryHashTable, HashStringFunction } from "../types"


const compareDictionaries = async (
	dictionary: DictionaryArray,
	hashDictionary: DictionaryHashTable,
	iteration: number,
) => {
	type wDataType = {
		arrDict: DictionaryArray,
		hashDictData: {
			arr: DictionaryArray
			hFString: string
			cFString: string
		},
		iteration: number
	}
	const worker = webwork((data) => {
		const rndNum = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min
		const measureRunTime = (func: (iteration: number) => void, iterations = 1) => {
			const dateBefore = Date.now()

			for (let i = 0; i < iterations; i++)
				func(i)
			const runTime = Date.now() - dateBefore

			return runTime
		}
		const searchDict = (word: string) => {
			for (let i=0; i<dat.arrDict.length; i++) {
				if (dat.arrDict[i][0] === word)
					return dat.arrDict[i][1]
			}
		}

		const dat = data as wDataType
		const arrDict = dat.arrDict
		const hashDict = {
			hashf: eval(dat.hashDictData.hFString) as HashStringFunction,
			collisionf: eval(dat.hashDictData.cFString) as CollisionHandler,
			arr: dat.hashDictData.arr,
			search(searchWord: string) {
				let hashIndex = this.hashf(searchWord) % this.arr.length
				let collisionCount = 0

				while (this.arr[hashIndex] && this.arr[hashIndex][0] !== searchWord){
					collisionCount++
					hashIndex = this.collisionf(hashIndex, searchWord, collisionCount) % this.arr.length
				}
				const pair = this.arr[hashIndex]

				return {
					translation: pair ? pair[1] : undefined,
					collisionCount,
				}
			},
		}
		const searchableWords = arrDict.map((pair) => pair[0])
		const wordCount = arrDict.length

		const dictRunTime = measureRunTime(
			() => searchDict(searchableWords[rndNum(0, wordCount)]),
			dat.iteration,
		)
		const hashRunTime = measureRunTime(
			() => hashDict.search(searchableWords[rndNum(0, wordCount)]),
			dat.iteration,
		)

		return {
			dictRandTime: dictRunTime,
			hashRandTime: hashRunTime,
		}
	})

	const wData: wDataType = {
		arrDict: dictionary,
		hashDictData: {
			arr: hashDictionary.hashTableArray,
			hFString: hashDictionary.hashFunction.toString(),
			cFString: hashDictionary.collisionHandler.toString(),
		},
		iteration: iteration,
	}

	const result = await worker(wData)


	return result
}

export default compareDictionaries