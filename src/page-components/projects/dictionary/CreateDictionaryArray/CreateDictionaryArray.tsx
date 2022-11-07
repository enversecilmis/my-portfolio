import { Dispatch, SetStateAction, useState } from 'react'
import { FileContent } from 'use-file-picker'
import FileChooser from '../../../../components/FileChooser/FileChooser'
import HoverHelp from '../../../../components/HoverHelp/HoverHelp'
import TextInput from '../../../../components/TextInput/TextInput'
import ThemedButton from '../../../../components/ThemedButton/ThemedButton'
import { useNotification } from '../../../../contexts/NotificationContext'
import { createDictionaryArrayFromString } from '../../../../projects-src/hashtabledict/hashtabledict'
import { Dictionary } from '../../../../projects-src/hashtabledict/types'
import { zDictionaryArray } from '../../../../projects-src/hashtabledict/utils'
import styles from './CreateDictionaryArray.module.scss'


const DEFAULT_WORD_SEPERATOR = " {2,}"
const DEFAULT_PAIR_SEPERATOR = "\\r\\n"



type State<T> = [T, Dispatch<SetStateAction<T>>]
type Props = {
    fileContentState: State<FileContent | undefined>
    wordSeperatorState: State<string>
    pairSeperatorState: State<string>
    dictionaryState: State<Dictionary | undefined>
}



const CreateDictionaryArray: React.FC<Props> = ({
    fileContentState,
    wordSeperatorState,
    pairSeperatorState,
    dictionaryState
}) => {
    const { pushNotification } = useNotification()
    const [fileContent, setFileContent] = fileContentState
    const [wordSeperator, setWordSeperator] = wordSeperatorState
    const [pairSeperator, setPairSeperator] = pairSeperatorState
    const [dictionary, setDictionary] = dictionaryState
    const [settingDefaults, setSettingDefaults] = useState(false)



    const setDefaultDictInputs = async () => {
        setSettingDefaults(true)
        const response = await fetch("/en-tr-dictionary.txt")
        const file = await response.text()
        setFileContent({
            content: file,
            name: "en-tr-dictionary.txt",
            lastModified: 0
        })
        setWordSeperator(DEFAULT_WORD_SEPERATOR)
        setPairSeperator(DEFAULT_PAIR_SEPERATOR)
        setSettingDefaults(false)
    }
    const createDictionaryArray = async () => {
        if (!fileContent?.content) return
        let wordRegex: RegExp
        let pairRegex: RegExp
        
        try {
            wordRegex = new RegExp(wordSeperator)
        } catch (error) {
            let msg = "Error occured when trying to evaluate regular expression."
            if (error instanceof Error)
                msg = error.toString()
            pushNotification(msg, { type: "error", source: "Word Seperator Input"})
            return
        }
        try {
            pairRegex = new RegExp(pairSeperator)
        } catch (error) {
            let msg = "Error occured when trying to evaluate regular expression."
            if (error instanceof Error)
                msg = error.toString()
            pushNotification(msg, { type: "error", source: "Pair Seperator Input"})
            return
        }
        const dictArr = createDictionaryArrayFromString(
            fileContent.content,
            wordRegex,
            pairRegex
        )
        if (!zDictionaryArray.safeParse(dictArr).success){
            pushNotification("Created array structure is not [string,string][]. Check your text file or seperators.",{
            type: "error",
            durationSeconds: 6000,
            source: "Create Dictionary Array"
            })
            setDictionary(undefined)
        }
        else
            setDictionary(dictArr)
    }

    return (
        <div className={styles.inputStep}>
            <h3 className={styles.stepTitle}>Create Dictionary Array</h3>
            <div className={styles.stepContent}>
                
                <div className={styles.labeledInput}>
                    <HoverHelp message="A .txt file that has words and their translation with seperators." />
                    <label className={styles.label}>File: </label>
                    <FileChooser
                        required
                        fileSelected={!!fileContent}
                        label='Choose a Text File'
                        accept='.txt'
                        multiple={false}
                        onChange={setFileContent}
                    />
                    {fileContent?.name}
                </div>
                <div className={styles.labeledInput}>
                    <HoverHelp message='Regexp for seperating word from its translation.' />
                    <label className={styles.label}>Word Seperator: </label>
                    <TextInput
                        required
                        placeholder='Word Seperator'
                        value={wordSeperator}
                        onChange={setWordSeperator}
                    />
                </div>
                <div className={styles.labeledInput}>
                    <HoverHelp message='Regexp for seperating each word-translation pairs.' />
                    <label className={styles.label}>Pair Seperator: </label>
                    <TextInput
                        required
                        placeholder='Pair Seperator'
                        value={pairSeperator}
                        onChange={setPairSeperator}
                    />
                </div>
                <ThemedButton
                    label='Use Default'
                    className={styles.useDefaultButton}
                    onClick={setDefaultDictInputs}
                    loading={settingDefaults}
                />
                <ThemedButton
                    className={styles.createArrayButton}
                    label='Create'
                    disabled={!fileContent || !wordSeperator || !pairSeperator}
                    onClick={createDictionaryArray}
                />
                {dictionary && (
                    <div className={styles.createdArray}>
                        <p className={styles.createdText}>Dictionary Created</p>
                        <p className={styles.infoText}>{dictionary.length} words found</p>
                    </div>
                )}
            </div>

        </div>
    )
}






export default CreateDictionaryArray