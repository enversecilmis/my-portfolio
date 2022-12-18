class TableSizeException extends Error {
	constructor() {
		super("Hash table size must be bigger than number of translations.")
	}
}
class DictionaryTypeException extends Error {
	constructor(){
		super("Created array doesn't fit the type [string,string][]. Check your file or seperators.")
	}
}

export {
	DictionaryTypeException,
	TableSizeException,
}