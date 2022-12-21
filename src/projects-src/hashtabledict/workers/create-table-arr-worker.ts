import { DictionaryArray, FromDictArrOptions, TableArray } from "../types"
import createTableArray from "../utils/create-table-array"




export type CreateTableArrWorkerData = {
	dictArr: DictionaryArray,
	tableSize: number,
	hFString: string,
	cFString: string,
	throwCollisionLoopError: boolean,
}

export type CreateTableArrWorkerReturnData = {
	tableArray: TableArray;
    allCollisions: number[];
}


onmessage = (ev: MessageEvent<CreateTableArrWorkerData>) => {
	const {
		dictArr,
		hFString,
		cFString,
		tableSize,
		throwCollisionLoopError,
	} = ev.data

	const options: FromDictArrOptions = {
		hashFunction: eval(hFString),
		collisionHandler: eval(cFString),
		tableSize,
		throwCollisionLoopError,
	}

	const data = createTableArray(dictArr, options)
	postMessage(data)
}