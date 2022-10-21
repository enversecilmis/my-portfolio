class TableSizeException extends Error {
    constructor(message: string) {
        super(message)
    }
}
class DictionaryTypeException extends Error {
    constructor(message: string){
        super(message)
    }
}

export {
    TableSizeException,
    DictionaryTypeException,
}