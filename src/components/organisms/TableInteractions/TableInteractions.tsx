import { useState } from "react"
import { useTranslation } from "next-i18next"

import { DictionaryArray, DictionaryHashTable } from "../../../projects-src/hashtabledict/types"
import TextInputWithSuggestions from "../../molecules/TextInputWithSuggestions/TextInputWithSuggestions"

import styles from "./TableInteractions.module.scss"

const searchInDictionaryArray = (text: string, dictionary: DictionaryArray) => {
	for (let i=0; i<dictionary.length; i++) {
		if (dictionary[i][0] === text)
			return dictionary[i][1]
	}
	return ""
}

type Props = {
    hashDictionary: DictionaryHashTable
    dictionary: DictionaryArray
}

const TableInteractions: React.FC<Props> = ({
	hashDictionary,
	dictionary,
}) => {
	const [searchWord, setSearchWord] = useState("")
	const [hashDictionaryTranslation, setHashDictionaryTranslation] = useState("")
	const [dictionaryTranslation, setdictionaryTranslation] = useState("")
	const [dictTime, setDictTime] = useState(0)
	const [hashTime, setHashTime] = useState(0)
	const { t: dictionaryT } = useTranslation("dictionary")

	const searchableWords = dictionary.map(pair => pair[0])


	const searchInDictionaries = () => {
		let searchStart = Date.now()
		const dictTranslation = searchInDictionaryArray(searchWord, dictionary)


		const dictSearchTime = Date.now() - searchStart

		setdictionaryTranslation(dictTranslation)
		setDictTime(dictSearchTime)

		searchStart = Date.now()
		const hashTranslation = hashDictionary.search(searchWord)
		const hashSearchTime = Date.now() - searchStart

		setHashDictionaryTranslation(hashTranslation.translation || "")
		setHashTime(hashSearchTime)
	}


	return (
		<div className={styles.container}>
			<TextInputWithSuggestions
				value={searchWord}
				onChange={setSearchWord}
				onSelectSuggestion={setSearchWord}
				options={searchableWords}
				numberOfSuggestions={5}
				onEnter={searchInDictionaries}
				className={styles.searchInput}
				InputClassName={styles.inputField}
			/>

			<div>
				<p>{dictionaryT("arraySearch")}</p>
				{dictionaryTranslation &&
                `${dictionaryTranslation} ${dictTime}ms`}
			</div>
			<div>
				<p>{dictionaryT("hashTableSearch")}</p>
				{hashDictionaryTranslation &&
                `${hashDictionaryTranslation} ${hashTime}ms`}
			</div>




		</div>
	)
}






export default TableInteractions