import createDictionaryArray from "./utils/create-dictionary-array"
import createTableArray from "./utils/create-table-array"
import { CollisionLoopError } from "./errors"
import { CollisionHandler, DictionaryArray, FromDictArrOptions, FromTextOptions, HashStringFunction, HashTableOptions, TableArray, TranslationPair } from "./types"




class ArrayDictionary {
	dictArray: DictionaryArray

	constructor(dictArr?: DictionaryArray) {
		this.dictArray = dictArr || []
	}


	search(searchWord: string) {
		for (let i=0; i<this.dictArray.length; i++) {
			if (searchWord === this.dictArray[i][0])
				return this.dictArray[i][1]
		}
	}

	searchUnoptimized(searchWord: string) {
		for (const [word, translation] of this.dictArray) {
			if (searchWord === word)
				return translation
		}
	}

	add(pair: TranslationPair) {
		this.dictArray.push(pair)
	}

	remove(word: string) {
		const newDictArr = this.dictArray.filter(pair => pair[0] !== word)
		this.dictArray = newDictArr
	}


	/**
	 * @throws `DictionaryTypeError`
	 */
	static fromText(
		text: string,
		wordSeperator: string | RegExp,
		pairSeperator: string | RegExp,
	) {
		const dictArr = createDictionaryArray(text, wordSeperator, pairSeperator)

		return new ArrayDictionary(dictArr)
	}
}





class HashTableDictionary {
	tableArray: TableArray
	hashFunction: HashStringFunction
	collisionHandler: CollisionHandler
	throwCollisionLoopError: boolean
	allCollisions: number[]

	/**
	 * @throws `TableSizeError`
	 */
	constructor(tableArray: TableArray, options: HashTableOptions) {
		this.tableArray = tableArray
		this.hashFunction = options.hashFunction
		this.collisionHandler = options.collisionHandler
		this.throwCollisionLoopError = !!options.throwCollisionLoopError
		this.allCollisions = options.allCollisions || []
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
				throw new CollisionLoopError()

			hashHistory.push(hashIndex)
		}

		this.tableArray[hashIndex] = translationPair
		this.allCollisions.push(collisionCount)
	}

	search(searchWord: string) {
		let hashIndex = this.hashFunction(searchWord) % this.tableArray.length
		let collisionCount = 0

		while (this.tableArray[hashIndex]?.[0] !== searchWord){
			collisionCount++
			hashIndex = this.collisionHandler(hashIndex, searchWord, collisionCount) % this.tableArray.length
		}
		const pair = this.tableArray[hashIndex]

		return {
			translation: pair? pair[1] : undefined,
			collisionCount,
		}
	}


	/**
	 * @throws `DictionaryTypeError`
	 * @throws `TableSizeError`
	 */
	static fromText(
		text: string,
		options: FromTextOptions,
	) {
		const { wordSeperator, pairSeperator, ...hTableOptions } = options

		const dictArr = createDictionaryArray(
			text,
			wordSeperator,
			pairSeperator,
		)

		return HashTableDictionary.fromDictArr(dictArr, hTableOptions)
	}


	/**
	 * @throws `TableSizeError`
	 */
	static fromDictArr(
		dictArr: DictionaryArray,
		options: FromDictArrOptions,
	) {
		const { tableArray, allCollisions } = createTableArray(dictArr, options)

		return new HashTableDictionary(
			tableArray,
			{ allCollisions, ...options },
		)
	}


	static loadFromSavedText(text: string){
		text
	}


	static saveToText(hashDict: HashTableDictionary){
		hashDict
	}
}




export {
	ArrayDictionary,
	HashTableDictionary,
}