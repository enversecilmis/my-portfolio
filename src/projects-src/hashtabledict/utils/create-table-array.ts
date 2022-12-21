import { TableSizeError } from "../errors"
import { HashTableDictionary } from "../hashtabledict"
import { DictionaryArray, FromDictArrOptions, TableArray } from "../types"

import findPrimeBiggerThan from "./find-prime"




/**
 * @throws `TableSizeError`
 */
const createTableArray = (
	dictArr: DictionaryArray,
	options: FromDictArrOptions,
) => {
	const { tableSize, ...rest } = options

	const cTableSize = tableSize === undefined ?
		findPrimeBiggerThan(dictArr.length*4):
		tableSize

	if (cTableSize <= dictArr.length)
		throw new TableSizeError()


	const tempObject = {
		tableArray: new Array(cTableSize),
		allCollisions: [],
		add: HashTableDictionary.prototype.add,
		...rest,
	}

	for (const pair of dictArr)
		tempObject.add(pair)

	return {
		tableArray: tempObject.tableArray as TableArray,
		allCollisions: tempObject.allCollisions,
	}
}


export default createTableArray