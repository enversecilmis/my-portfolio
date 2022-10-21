type Word = string
type Translation = string
export type Dictionary = [Word, Translation][]

export type HashTableArray = [Word, Translation][]

export type HashStringFunction = (input: string) => number

export type OnCollisionNextIndexHandler = ( currentHashValue: number, input: string, iteration: number) => number

export type CreateHashTableOptions = {
    hashFunction?: HashStringFunction
    collisionHandler?: OnCollisionNextIndexHandler
    hashTableSize?: number
    throwInfiniteLoopError?: boolean
}



export type DictionaryHashTable = {
    hashTableArray: HashTableArray
    loadFactor: number
    allCollisions: number[]
    
    hashFunction: HashStringFunction
    collisionHandler: OnCollisionNextIndexHandler
    search: (searchWord: Word) => { translation: Translation | undefined, collisionCount: number }
    add: (wordTranslationPair: [Word,Translation], throwInfiniteLoopError?: boolean) => void
}