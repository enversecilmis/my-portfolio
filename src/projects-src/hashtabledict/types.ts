type Word = string
type Translation = string
export type TranslationPair = [Word, Translation]

export type DictionaryArray = TranslationPair[]

export type TableArray = Partial<DictionaryArray>

export type HashStringFunction = (input: string) => number

export type CollisionHandler = ( currentHashValue: number, input: string, iteration: number) => number

export type HashTableOptions = {
	hashFunction: HashStringFunction
	collisionHandler: CollisionHandler
	throwCollisionLoopError?: boolean
	allCollisions?: number[]
}

export type FromDictArrOptions = {
	tableSize?: number
	hashFunction: HashStringFunction
    collisionHandler: CollisionHandler
    throwCollisionLoopError?: boolean
}

export type FromTextOptions = {
	tableSize?: number
	hashFunction: HashStringFunction
	collisionHandler: CollisionHandler
	pairSeperator: string | RegExp
	wordSeperator: string | RegExp
	throwCollisionLoopError?: boolean
}



export type LoadTableOptions = Omit<HashTableOptions, "tableSize"| "wordSeperator" | "pairSeperator">