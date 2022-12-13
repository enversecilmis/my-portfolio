import { useMemo, useState } from "react"
import ThemedButton from "@components/atoms/ThemedButton/ThemedButton"
import { createKeyHandler } from "@utils/create-key-handler"
import { useTranslation } from "next-i18next"

import { DictionaryArray, DictionaryHashTable } from "../../../projects-src/hashtabledict/types"
import TextInputWithSuggestions from "../../molecules/TextInputWithSuggestions/TextInputWithSuggestions"

import styles from "./DictionarySearch.module.scss"



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

const DictionarySearch: React.FC<Props> = ({
	hashDictionary,
	dictionary,
}) => {
	const [searchWord, setSearchWord] = useState("")
	const [hashDictionaryTranslation, setHashDictionaryTranslation] = useState("")
	const [dictionaryTranslation, setdictionaryTranslation] = useState("")
	const [dictTime, setDictTime] = useState(0)
	const [hashTime, setHashTime] = useState(0)
	const { t: dictionaryT } = useTranslation("dictionary")
	const { t: commonT } = useTranslation("common")

	const searchableWords = useMemo(() => dictionary.map(pair => pair[0]), [dictionary])


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

	const keyActions = createKeyHandler({
		Enter(){
			searchInDictionaries()
		},
	})

	return (
		<div className={styles.container}>
			<div className={styles.searchInputBox}>
				<TextInputWithSuggestions
					containerClassName={styles.searchInputContainer}
					className={styles.input}
					value={searchWord}
					onChange={setSearchWord}
					options={searchableWords}
					maxSuggestions={5}
					onKeyDown={keyActions}
					placeholder={commonT("search")}
				/>
				<ThemedButton
					label={commonT("search")}
					onClick={searchInDictionaries}
					className={styles.searchButton}
				/>
			</div>

			<p className={styles.translationBox}>
				{dictionaryTranslation}
			</p>

			<div className={styles.performanceDisplay}>
				<p>{dictionaryT("arraySearch")}: <span>{dictTime} ms</span></p>
				<p>{dictionaryT("hashTableSearch")}: <span>{hashTime} ms</span></p>
			</div>
		</div>
	)
}






export default DictionarySearch