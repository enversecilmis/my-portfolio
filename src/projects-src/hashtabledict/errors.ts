class TableSizeError extends Error {
	static _name = "TableSizeError"
	constructor() {
		super("Hash table size must be bigger than number of translations.")
		this.name = "TableSizeError"
	}
}
class DictionaryTypeError extends Error {
	static _name = "DictionaryTypeError"
	constructor(){
		super("Created array doesn't fit the type [string,string][]. Check your file or seperators.")
		this.name = "DictionaryTypeError"
	}
}
class CollisionLoopError extends Error {
	static _name = "CollisionLoopError"
	constructor(){
		super("Collision loop detected.")
		this.name = "CollisionLoopError"
	}
}
class ReturnTypeError extends Error {
	static _name = "ReturnTypeError"
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