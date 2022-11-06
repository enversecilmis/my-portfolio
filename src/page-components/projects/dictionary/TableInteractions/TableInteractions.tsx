import TextInput from '../../../../components/TextInput/TextInput'
import styles from './TableInteractions.module.scss'
import { useState } from "react"
import ThemedButton from '../../../../components/ThemedButton/ThemedButton'
import { DictionaryHashTable } from '../../../../projects-src/hashtabledict/types'
import { BiTransferAlt } from "react-icons/bi"


type Props = {
    hashDictionary: DictionaryHashTable
}

const TableInteractions: React.FC<Props> = ({
    hashDictionary
}) => {
    const [searchWord, setSearchWord] = useState("")
    const [translation, setTranslation] = useState("")
    
    return (
        <div  className={styles.container}>
            <div className={styles.searchInputs}>
                <TextInput
                    value={searchWord}
                    onChange={setSearchWord}
                    onKeyDown={(e) => {
                        if(e.key === "Enter")
                            setTranslation(hashDictionary.search(searchWord).translation || "")
                    }}    
                />
                <ThemedButton
                    onClick={() => {
                        setTranslation(hashDictionary.search(searchWord).translation || "")
                    }}
                >
                    Search
                </ThemedButton>
                <BiTransferAlt className={styles.arrow}/>
                <span>{translation}</span>
            </div>
        </div>
    )
}






export default TableInteractions