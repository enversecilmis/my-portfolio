class TableSizeError extends Error {
	constructor() {
		super("Hash table size must be bigger than number of translations.")
		this.name = "TableSizeError"
	}
}
class DictionaryTypeError extends Error {
	constructor(){
		super("Created array doesn't fit the type [string,string][]. Check your file or seperators.")
		this.name = "DictionaryTypeError"
	}
}
class CollisionLoopError extends Error {
	constructor(){
		super("Collision loop detected.")
		this.name = "CollisionLoopError"
	}
}
class ReturnTypeError extends Error {
	constructor(){
		super("Return type is not valid.")
		this.name = "ReturnTypeError"
	}
}

export {
	CollisionLoopError,
	DictionaryTypeError,
	ReturnTypeError,
	TableSizeError,
}