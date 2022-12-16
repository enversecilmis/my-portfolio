type Word = string
type Translation = string
export type TranslationPair = [Word, Translation]

export type DictionaryArray = TranslationPair[]

export type HashStringFunction = (input: string) => number

export type CollisionHandler = ( currentHashValue: number, input: string, iteration: number) => number


export type FromTextOptions = {
	hashFunction: HashStringFunction
	collisionHandler: CollisionHandler
	tableSize: number | "auto"
	pairSeperator: string | RegExp
	wordSeperator: string | RegExp
	throwCollisionLoopError?: boolean
}

export type HashTableOptions = Omit<FromTextOptions, "pairSeperator" | "wordSeperator">

