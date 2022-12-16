import { useMemo, useState } from "react"
import ThemedButton from "@components/atoms/ThemedButton/ThemedButton"
import { createKeyHandler } from "@utils/create-key-handler"
import { useTranslation } from "next-i18next"

import { ArrayDictionary, HashTableDictionary } from "../../../projects-src/hashtabledict/hashtabledict"
import TextInputWithSuggestions from "../../molecules/TextInputWithSuggestions/TextInputWithSuggestions"

import styles from "./DictionarySearch.module.scss"



type Props = {
    hashDict: HashTableDictionary
    arrDict: ArrayDictionary
}

const DictionarySearch: React.FC<Props> = ({
	hashDict,
	arrDict,
}) => {
	const [searchWord, setSearchWord] = useState("")
	const [translation, setTranslation] = useState("")
	const [dictTime, setDictTime] = useState(0)
	const [hashTime, setHashTime] = useState(0)
	const { t: dictionaryT } = useTranslation("dictionary")
	const { t: commonT } = useTranslation("common")

	const searchableWords = useMemo(() => arrDict.dictArray.map(pair => pair[0]), [arrDict])


	const searchInDictionaries = () => {
		let searchStart = Date.now()
		const arrTranslation = arrDict.search(searchWord)
		const dictSearchTime = Date.now() - searchStart


		searchStart = Date.now()
		hashDict.search(searchWord)
		const hashSearchTime = Date.now() - searchStart

		setDictTime(dictSearchTime)
		setHashTime(hashSearchTime)
		setTranslation(arrTranslation || "*** no result ***")
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
				{translation}
			</p>

			<div className={styles.performanceDisplay}>
				<p>{dictionaryT("arraySearch")}: <span>{dictTime} ms</span></p>
				<p>{dictionaryT("hashTableSearch")}: <span>{hashTime} ms</span></p>
			</div>
		</div>
	)
}






export default DictionarySearch