import { measureRunTime } from "@utils/measure-run-time"
import { rndNum } from "@utils/random-number"

import { CollisionHandler, DictionaryArray, HashStringFunction } from "../types"




type WData = {
	arrDict: DictionaryArray,
	hashDictData: {
		arr: DictionaryArray
		hFString: string
		cFString: string
	},
	iteration: number
}

onmessage = function(event: MessageEvent<WData>) {
	const data = event.data

	const searchDict = (word: string) => {
		for (let i=0; i<data.arrDict.length; i++) {
			if (data.arrDict[i][0] === word)
				return data.arrDict[i][1]
		}
	}

	const arrDict = data.arrDict
	const hashDict = {
		hashf: eval(data.hashDictData.hFString) as HashStringFunction,
		collisionf: eval(data.hashDictData.cFString) as CollisionHandler,
		arr: data.hashDictData.arr,
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

	const arrRunTime = measureRunTime(
		() => searchDict(searchableWords[rndNum(0, wordCount)]),
		data.iteration,
	)
	const hashRunTime = measureRunTime(
		() => hashDict.search(searchableWords[rndNum(0, wordCount)]),
		data.iteration,
	)


	postMessage({
		arrRunTime,
		hashRunTime,
	})
}



