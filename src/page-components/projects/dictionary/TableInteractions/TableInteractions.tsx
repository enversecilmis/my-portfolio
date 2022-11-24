import { KeyboardEventHandler, useState } from "react"
import { BiTransferAlt } from "react-icons/bi"

import TextInput from "../../../../components/TextInput/TextInput"
import TextInputWithSuggestions from "../../../../components/TextInputWithSuggestions/TextInputWithSuggestions"
import ThemedButton from "../../../../components/ThemedButton/ThemedButton"
import { Dictionary, DictionaryHashTable } from "../../../../projects-src/hashtabledict/types"

import styles from "./TableInteractions.module.scss"


type Props = {
    hashDictionary: DictionaryHashTable
    dictionary: Dictionary
}

const TableInteractions: React.FC<Props> = ({
	hashDictionary,
	dictionary
}) => {
	const [searchWord, setSearchWord] = useState("")
	const [hashDictionaryTranslation, setHashDictionaryTranslation] = useState("")
	const [dictionaryTranslation, setdictionaryTranslation] = useState("")
	const [dictTime, setDictTime] = useState(0)
	const [hashTime, setHashTime] = useState(0)

	const searchableWords = dictionary.map(pair => pair[0])


	const searchInDictionaries = () => {
		let searchStart = Date.now()
		const dictTranslation = dictionary.filter(pair => pair[0] === searchWord)[0][1] || ""
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
			/>

			<div>
				<p>dict translation</p>
				{dictionaryTranslation &&
                `${dictionaryTranslation} ${dictTime}ms`}
			</div>
			<div>
				<p>hahs translation</p>
				{hashDictionaryTranslation &&
                `${hashDictionaryTranslation} ${hashTime}ms`}
			</div>




		</div>
	)
}






export default TableInteractions