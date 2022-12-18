import { DictionaryTypeException, TableSizeException } from "./exceptions"
import { CollisionHandler, DictionaryArray, FromTextOptions, HashStringFunction, HashTableOptions, TranslationPair } from "./types"
import { findAPrimeBiggerThan, zDictionaryArray } from "./utils"





class ArrayDictionary {
	dictArray: DictionaryArray

	/**
	 * @throws `DictionaryTypeException`
	 */
	constructor(dictArr?: DictionaryArray) {
		this.dictArray = dictArr || []
	}


	search(searchWord: string) {
		let translation: string | undefined

		for (let i=0; i<this.dictArray.length; i++) {
			if (searchWord === this.dictArray[i][0]) {
				translation = this.dictArray[i][1]
				break
			}
		}
		return translation
	}

	add(pair: TranslationPair) {
		this.dictArray.push(pair)
	}

	remove(word: string) {
		const newDictArr = this.dictArray.filter(pair => pair[0] !== word)
		this.dictArray = newDictArr
	}


	static fromText(
		text: string,
		wordSeperator: string | RegExp,
		pairSeperator: string | RegExp,
	) {
		const dictArr: DictionaryArray = text
			.split(pairSeperator)
			.map(pair => pair.split(wordSeperator) as TranslationPair)

		if (!zDictionaryArray.safeParse(dictArr).success)
			throw new DictionaryTypeException()

		return new ArrayDictionary(dictArr)
	}
}






class HashTableDictionary {
	tableArray: DictionaryArray
	hashFunction: HashStringFunction
	collisionHandler: CollisionHandler
	throwCollisionLoopError: boolean
	allCollisions: number[]


	/**
	 * @throws `TableSizeException`
	 */
	constructor(
		arrDict: ArrayDictionary,
		{
			collisionHandler,
			hashFunction,
			tableSize,
			throwCollisionLoopError,
		}: HashTableOptions,
	) {
		const dictArr = arrDict.dictArray
		const cTableSize = tableSize === "auto" ?
			findAPrimeBiggerThan(dictArr.length):
			tableSize

		if (cTableSize <= dictArr.length)
			throw new TableSizeException()

		this.tableArray = new Array(cTableSize)
		this.throwCollisionLoopError = !!throwCollisionLoopError
		this.hashFunction = hashFunction
		this.collisionHandler = collisionHandler
		this.allCollisions = []

		for (const pair of dictArr)
			this.add(pair)
	}


	add(translationPair: TranslationPair) {
		const [word] = translationPair
		let hashIndex = this.hashFunction(word) % this.tableArray.length

		const hashHistory: number[] = []
		hashHistory.push(hashIndex)

		// Collision handling loop
		let collisionCount = 0
		while (this.tableArray[hashIndex]) {
			collisionCount++
			hashIndex = this.collisionHandler(hashIndex, word, collisionCount) % this.tableArray.length

			// Throw error on collision loop if the option is set.
			if (this.throwCollisionLoopError && hashHistory.includes(hashIndex))
				throw new Error("Infinite collision loop.")

			hashHistory.push(hashIndex)
		}

		this.tableArray[hashIndex] = translationPair
		this.allCollisions.push(collisionCount)
	}


	search(searchWord: string) {
		let hashIndex = this.hashFunction(searchWord) % this.tableArray.length
		let collisionCount = 0

		while (this.tableArray[hashIndex] && this.tableArray[hashIndex][0] !== searchWord){
			collisionCount++
			hashIndex = this.collisionHandler(hashIndex, searchWord, collisionCount) % this.tableArray.length
		}
		const pair = this.tableArray[hashIndex]

		return {
			translation: pair? pair[1] : undefined,
			collisionCount,
		}
	}


	static fromText(
		text: string,
		options: FromTextOptions,
	) {
		const arrDict = ArrayDictionary.fromText(text, options.wordSeperator, options.pairSeperator)

		return new HashTableDictionary(arrDict, {
			hashFunction: options.hashFunction,
			collisionHandler: options.collisionHandler,
			tableSize: options.tableSize,
			throwCollisionLoopError: options.throwCollisionLoopError,
		})
	}
}



export {
	ArrayDictionary,
	HashTableDictionary,
}