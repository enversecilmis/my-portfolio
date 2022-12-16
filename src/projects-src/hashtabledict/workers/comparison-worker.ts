import webwork from "@kolodny/webwork"

import { ArrayDictionary, HashTableDictionary } from "../hashtabledict"
import { CollisionHandler, DictionaryArray, HashStringFunction } from "../types"


type wDataType = {
	dictArr: DictionaryArray,
	hashDictData: {
		arr: DictionaryArray
		hFString: string
		cFString: string
	},
	iteration: number
}


const compareDictionaries = async (
	arrDict: ArrayDictionary,
	hashDict: HashTableDictionary,
	iteration: number,
) => {
	const worker = webwork((data) => {
		const rndNum = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min
		const measureRunTime = (func: (iteration: number) => void, iterations = 1) => {
			const dateBefore = Date.now()

			for (let i = 0; i < iterations; i++)
				func(i)
			const runTime = Date.now() - dateBefore

			return runTime
		}


		const dat = data as wDataType
		const arrDict = {
			arr: dat.dictArr,
			search(searchWord: string) {
				let translation: string | undefined

				for (let i=0; i<this.arr.length; i++) {
					if (searchWord === this.arr[i][0]) {
						translation = this.arr[i][1]
						break
					}
				}

				return translation
			},
		}
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
		const searchableWords = arrDict.arr.map((pair) => pair[0])
		const wordCount = arrDict.arr.length

		const arrRunTime = measureRunTime(
			() => arrDict.search(searchableWords[rndNum(0, wordCount)]),
			dat.iteration,
		)
		const hashRunTime = measureRunTime(
			() => hashDict.search(searchableWords[rndNum(0, wordCount)]),
			dat.iteration,
		)

		return {
			arrRunTime,
			hashRunTime,
		}
	})

	const wData: wDataType = {
		dictArr: arrDict.dictArray,
		hashDictData: {
			arr: hashDict.tableArray,
			hFString: hashDict.hashFunction.toString(),
			cFString: hashDict.collisionHandler.toString(),
		},
		iteration: iteration,
	}

	const result = await worker(wData)


	return result
}

export default compareDictionaries