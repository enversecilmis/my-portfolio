import TextInput from '../../../../components/TextInput/TextInput'
import styles from './TableInteractions.module.scss'
import { KeyboardEventHandler, useState } from "react"
import ThemedButton from '../../../../components/ThemedButton/ThemedButton'
import { Dictionary, DictionaryHashTable } from '../../../../projects-src/hashtabledict/types'
import { BiTransferAlt } from "react-icons/bi"
import TextInputWithSuggestions from '../../../../components/TextInputWithSuggestions/TextInputWithSuggestions'


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

    const searchableWords = dictionary.map(pair => pair[0])

    
    const searchInDictionaries = () => {
        let searchStart = Date.now()
        const dictTranslation = dictionary.filter(pair => pair[0] === searchWord)[0][1] || ""
        let dictSearchTime = Date.now() - searchStart
        setdictionaryTranslation(dictTranslation)
        
        searchStart = Date.now()
        const hashTranslation = hashDictionary.search(searchWord)
        const hashSearchTime = Date.now() - searchStart
        setHashDictionaryTranslation(hashTranslation.translation || "")
    }


    return (
        <div  className={styles.container}>
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
                {dictionaryTranslation}
            </div>
            <div>
                <p>hahs translation</p>
                {hashDictionaryTranslation}
            </div>
            


            
        </div>
    )
}






export default TableInteractions