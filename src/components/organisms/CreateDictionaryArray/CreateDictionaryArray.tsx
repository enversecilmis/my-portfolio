import { Dispatch, SetStateAction, useState } from "react"
import { useTranslation } from "next-i18next"
import { FileContent } from "use-file-picker"

import { useNotification } from "../../../contexts/NotificationContext"
import { createDictionaryArrayFromString } from "../../../projects-src/hashtabledict/hashtabledict"
import { DictionaryArray } from "../../../projects-src/hashtabledict/types"
import FileChooser from "../../atoms/FileChooser/FileChooser"
import HoverHelp from "../../atoms/HoverHelp/HoverHelp"
import TextInput from "../../atoms/TextInput/TextInput"
import ThemedButton from "../../atoms/ThemedButton/ThemedButton"

import styles from "./CreateDictionaryArray.module.scss"


const DEFAULT_WORD_SEPERATOR = " {2,}"
const DEFAULT_PAIR_SEPERATOR = "\\r\\n"



type State<T> = [T, Dispatch<SetStateAction<T>>]
type Props = {
    fileContentState: State<FileContent | undefined>
    wordSeperatorState: State<string>
    pairSeperatorState: State<string>
    dictionaryState: State<DictionaryArray | undefined>
}



const CreateDictionaryArray: React.FC<Props> = ({
	fileContentState,
	wordSeperatorState,
	pairSeperatorState,
	dictionaryState,
}) => {
	const { pushNotification } = useNotification()
	const [fileContent, setFileContent] = fileContentState
	const [wordSeperator, setWordSeperator] = wordSeperatorState
	const [pairSeperator, setPairSeperator] = pairSeperatorState
	const [dictionary, setDictionary] = dictionaryState
	const [settingDefaults, setSettingDefaults] = useState(false)
	const { t: dictionaryT } = useTranslation("dictionary")
	const { t: commonT } = useTranslation("common")



	const setDefaultDictInputs = async () => {
		setSettingDefaults(true)
		const response = await fetch("/files/en-tr-dictionary.txt")
		const file = await response.text()

		setFileContent({
			content: file,
			name: "en-tr-dictionary.txt",
			lastModified: 0,
		})
		setWordSeperator(DEFAULT_WORD_SEPERATOR)
		setPairSeperator(DEFAULT_PAIR_SEPERATOR)
		setSettingDefaults(false)
	}


	const createDictionaryArray = async () => {
		if (!fileContent?.content)
			return
		let wordRegex: RegExp
		let pairRegex: RegExp

		// Word seperator eval.
		try {
			wordRegex = new RegExp(wordSeperator)
		} catch (error) {
			let msg = commonT("regexEvalError")

			if (error instanceof Error)
				msg = `${msg}\r\n${error.toString()}`
			pushNotification(msg, { type: "error", source: dictionaryT("wordSeperatorInput") })
			return
		}
		// Pair seperator eval.
		try {
			pairRegex = new RegExp(pairSeperator)
		} catch (error) {
			let msg = commonT("regexEvalError")

			if (error instanceof Error)
				msg = `${msg}\r\n${error.toString()}`
			pushNotification(msg, { type: "error", source: dictionaryT("pairSeperatorInput") })
			return
		}
		// Dictionary creation.
		try {
			const dictArr = createDictionaryArrayFromString(
				fileContent.content,
				wordRegex,
				pairRegex,
			)

			setDictionary(dictArr)
		} catch (error) {
			pushNotification(dictionaryT("createDictArrError"), {
				type: "error",
				durationSeconds: 6000,
				source: dictionaryT("createDictArr"),
			})

			setDictionary(undefined)
		}
	}



	return (
		<div className={styles.inputStep}>
			<h3 className={styles.stepTitle}>{dictionaryT("createDictArr")}</h3>
			<div className={styles.stepContent}>

				<div className={styles.labeledInput}>
					<HoverHelp message={dictionaryT("fileHelp")} />
					<label className={styles.label}>{dictionaryT("file")}: </label>
					<FileChooser
						required
						fileSelected={!!fileContent}
						label={dictionaryT("chooseFile")}
						accept=".txt"
						multiple={false}
						onChange={setFileContent}
					/>
					{fileContent?.name}
				</div>
				<div className={styles.labeledInput}>
					<HoverHelp message={dictionaryT("wordSeperatorHelp")} />
					<label className={styles.label}>{dictionaryT("wordSeperator")}: </label>
					<TextInput
						required
						value={wordSeperator}
						onChange={setWordSeperator}
					/>
				</div>
				<div className={styles.labeledInput}>
					<HoverHelp message={dictionaryT("pairSeperatorHelp")} />
					<label className={styles.label}>{dictionaryT("pairSeperator")}: </label>
					<TextInput
						required
						value={pairSeperator}
						onChange={setPairSeperator}
					/>
				</div>
				<ThemedButton
					label={dictionaryT("useDefault")}
					className={styles.useDefaultButton}
					onClick={setDefaultDictInputs}
					loading={settingDefaults}
				/>
				<ThemedButton
					className={styles.createArrayButton}
					label={dictionaryT("create")}
					disabled={!fileContent || !wordSeperator || !pairSeperator}
					onClick={createDictionaryArray}
				/>
				{dictionary && (
					<div className={styles.createdArray}>
						<p className={styles.createdText}>{dictionaryT("dictionaryCreated")}</p>
						<p className={styles.infoText}>{dictionary.length} {dictionaryT("wordsFound")}</p>
					</div>
				)}
			</div>

		</div>
	)
}






export default CreateDictionaryArray