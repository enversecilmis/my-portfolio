import { DictionaryArray } from "../types"
import createDictionaryArray from "../utils/create-dictionary-array"




export type CreateDictArrWorkerData = {
	text: string
	wordSeperator: string | RegExp
	pairSeperator: string | RegExp
}

export type CreateDictArrWorkerReturnData = DictionaryArray


onmessage = (ev: MessageEvent<CreateDictArrWorkerData>) => {
	const { text, wordSeperator, pairSeperator } = ev.data

	try {
		const dictArr = createDictionaryArray(
			text,
			wordSeperator,
			pairSeperator,
		)
		postMessage(dictArr)
	} catch (err) {
		if (err instanceof Error){
			throw err.name
		}
	}
}