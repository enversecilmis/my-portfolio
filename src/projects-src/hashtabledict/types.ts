type Word = string
type Translation = string
export type DictionaryArray = [Word, Translation][]

export type HashTableArray = [Word, Translation][]

export type HashStringFunction = (input: string) => number

export type CollisionHandler = ( currentHashValue: number, input: string, iteration: number) => number

export type CreateHashTableOptions = {
    hashFunction?: HashStringFunction
    collisionHandler?: CollisionHandler
    hashTableSize?: number
    throwInfiniteLoopError?: boolean
}



export type DictionaryHashTable = {
    hashTableArray: HashTableArray
    loadFactor: number
    allCollisions: number[]

    hashFunction: HashStringFunction
    collisionHandler: CollisionHandler
    search: (searchWord: Word) => { translation: Translation | undefined, collisionCount: number }
    add: (wordTranslationPair: [Word, Translation], throwInfiniteLoopError?: boolean) => void
}