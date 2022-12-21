import { DictionaryTypeError } from "../errors"
import { DictionaryArray, TranslationPair } from "../types"

import zDictionaryArray from "./dictionary-array-schema"


/**
* @throws `DictionaryTypeError`
*/
const createDictionaryArray = (
	text: string,
	wordSeperator: string | RegExp,
	pairSeperator: string | RegExp,
) => {
	const dictArr: DictionaryArray = text
		.split(pairSeperator)
		.map(pair => pair.split(wordSeperator) as TranslationPair)

	if (!zDictionaryArray.safeParse(dictArr).success)
		throw new DictionaryTypeError()

	return dictArr
}


export default createDictionaryArray