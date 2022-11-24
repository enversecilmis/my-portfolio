import { DictionaryTypeException, TableSizeException } from "./exceptions"
import { CreateHashTableOptions, Dictionary, DictionaryHashTable } from "./types"
import { defaultCollisionHandler, defaultHashStringFunction, findAPrimeBiggerThan, zDictionaryArray } from "./utils"







/**
 * Creates a dictionary array from a string.
 * String should have word and its translation with a seperator between them
 * and also a seperator between word-translation pairs.
 * @param text structure should be `"word /wordSeperator/ translation /pairSeperator/ ..."`
 * @param wordSeperator Defaults to `/ {2,}/`
 * @param pairSeperator Defaults to `"\r\n"`
 * @return `[Word,Translation][]`
*/
const createDictionaryArrayFromString = (
	text: string,
	wordSeperator: string | RegExp = / {2,}/,
	pairSeperator: string | RegExp = "\r\n",
): Dictionary => {
	// shorthand
	// const dictionary = text
	//                     .split(pairSeperator)
	//                     .map(pair => pair.split(wordSeperator) as [string,string])
	const pairs = text.split(pairSeperator)

	const dictionary = pairs.map(pair => {
		const [word, translation] = pair.split(wordSeperator)

		return [word, translation] as [string, string]
	})

	return dictionary
}





/**
 * @throws `TableSizeException`
 * @throws `DictionaryTypeException`
 */
const createHashTableFromDictionary = (
	dictionary: Dictionary,
	hashTableOptions?: CreateHashTableOptions,
) => {
	const defaults = {
		hashFunction: defaultHashStringFunction,
		collisionHandler: defaultCollisionHandler,
		hashTableSize: findAPrimeBiggerThan(dictionary.length*4),
		throwInfiniteLoopError: false,
	}
	const {
		hashFunction,
		collisionHandler,
		hashTableSize,
		throwInfiniteLoopError,
	} = { ...defaults, ...hashTableOptions }

	// Validate size.
	if (hashTableSize <= dictionary.length) {
		console.log("Small dickington")

		throw new TableSizeException("Hash table size must be bigger than dictionary size.")
	}

	// Validate dictionary array.
	if (!zDictionaryArray.safeParse(dictionary).success)
		throw new DictionaryTypeException("Dictionary arguement doesn't fit the type [string,string][].")


	const dictionaryHashTable: DictionaryHashTable = {
		hashTableArray: new Array(hashTableSize),
		loadFactor: 0,
		allCollisions: [],
		hashFunction,
		collisionHandler,

		search(searchWord) {
			let hashIndex = this.hashFunction(searchWord) % this.hashTableArray.length
			let collisionCount = 0

			while (this.hashTableArray[hashIndex] && this.hashTableArray[hashIndex][0] !== searchWord){
				collisionCount++
				hashIndex = this.collisionHandler(hashIndex, searchWord, collisionCount) % this.hashTableArray.length
			}
			const pair = this.hashTableArray[hashIndex]

			return {
				translation: pair? pair[1] : undefined,
				collisionCount,
			}
		},

		add(pair, throwInfiniteLoopError) {
			const [word, translation] = pair
			let hashIndex = this.hashFunction(word) % this.hashTableArray.length
			const hashHistory: number[] = []

			hashHistory.push(hashIndex)

			let collisionCount = 0

			while (this.hashTableArray[hashIndex]) {
				collisionCount++
				hashIndex = this.collisionHandler(hashIndex, word, collisionCount) % this.hashTableArray.length

				// Throw error on collision loop if the option is set.
				if (throwInfiniteLoopError && hashHistory.includes(hashIndex))
					throw new Error("Infinite collision loop.")
				hashHistory.push(hashIndex)
			}

			this.hashTableArray[hashIndex] = [word, translation]
			this.loadFactor += 1/this.hashTableArray.length
			this.allCollisions.push(collisionCount)
		},
	}


	for (const pair of dictionary) {
		dictionaryHashTable.add(pair, throwInfiniteLoopError)
	}


	return dictionaryHashTable
}





export {
	createDictionaryArrayFromString,
	createHashTableFromDictionary,
}