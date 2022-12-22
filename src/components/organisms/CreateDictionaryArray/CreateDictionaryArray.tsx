import { Dispatch, SetStateAction, useState } from "react"
import getErrorMessage from "@utils/get-error-message"
import { useTranslation } from "next-i18next"
import { FileContent } from "use-file-picker"

import { useNotification } from "../../../contexts/NotificationContext"
import { DictionaryTypeError } from "../../../projects-src/hashtabledict/errors"
import { ArrayDictionary } from "../../../projects-src/hashtabledict/hashtabledict"
import runCreateDictArrWorker from "../../../projects-src/hashtabledict/utils/run-create-dict-arr-worker"
import FileChooser from "../../atoms/FileChooser/FileChooser"
import HoverHelp from "../../atoms/HoverHelp/HoverHelp"
import TextInput from "../../atoms/TextInput/TextInput"
import ThemedButton from "../../atoms/ThemedButton/ThemedButton"

import styles from "./CreateDictionaryArray.module.scss"


// TODO: Fix the ugliness.


type State<T> = [T, Dispatch<SetStateAction<T>>]
type Props = {
    fileContentState: State<FileContent | undefined>
    wordSeperatorState: State<string>
    pairSeperatorState: State<string>
    arrDictState: State<ArrayDictionary | undefined>
}


const DEFAULT_WORD_SEPERATOR = " {2,}"
const DEFAULT_PAIR_SEPERATOR = "\\n"

const CreateDictionaryArray: React.FC<Props> = ({
	fileContentState,
	wordSeperatorState,
	pairSeperatorState,
	arrDictState,
}) => {
	const { pushNotification } = useNotification()
	const [fileContent, setFileContent] = fileContentState
	const [wordSeperator, setWordSeperator] = wordSeperatorState
	const [pairSeperator, setPairSeperator] = pairSeperatorState

	const [arrDict, setArrDict] = arrDictState
	const [settingDefaults, setSettingDefaults] = useState(false)
	const [creating, setCreating] = useState(false)
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
		setCreating(true)

		let wordRegex: RegExp
		let pairRegex: RegExp

		// Word seperator eval.
		try {
			wordRegex = new RegExp(wordSeperator)
		}
		catch (error) {
			const msg = getErrorMessage(error, [
				[Error, (er) => `${commonT("regexEvalError")} \r\n ${er.toString()}`],
				["default", `${commonT("regexEvalError")}`],
			])

			pushNotification(msg, {
				type: "error",
				source: dictionaryT("wordSeperatorInput"),
				duration: 6000,
			})
			setCreating(false)
			return
		}
		// Pair seperator eval.
		try {
			pairRegex = new RegExp(pairSeperator)
		}
		catch (error) {
			const msg = getErrorMessage(error, [
				[Error, (er) => `${commonT("regexEvalError")} \r\n ${er.toString()}`],
				["default", `${commonT("regexEvalError")}`],
			])

			pushNotification(msg, {
				type: "error",
				source: dictionaryT("pairSeperatorInput"),
				duration: 6000,
			})
			setCreating(false)
			return
		}

		// Dictionary creation.
		try {
			const dictArr = await runCreateDictArrWorker(
				fileContent.content,
				wordRegex,
				pairRegex,
			)
			const newArrDict = new ArrayDictionary(dictArr)
			setArrDict(newArrDict)
		}
		catch (error) {
			setArrDict(undefined)
			const msg = getErrorMessage(error, [
				[DictionaryTypeError, `${dictionaryT("createDictArrError")}`],
				["default", "Unknown Error"],
			])

			pushNotification(msg, {
				type: "error",
				duration: 6000,
				source: dictionaryT("createDictArr"),
			})
		}
		setCreating(false)
	}


	return (
		<div className={styles.inputStep}>
			<h3 className={styles.stepTitle}>
				{dictionaryT("createDictArr")}
			</h3>

			<div className={styles.stepContent}>
				<div className={styles.labeledInput}>
					<HoverHelp message={dictionaryT("fileHelp")}/>
					<label className={styles.label}>
						{dictionaryT("file")}:
					</label>
					<FileChooser
						required
						fileSelected={!!fileContent}
						label={dictionaryT("chooseFile")}
						accept=".txt"
						multiple={false}
						onChange={setFileContent}/>
					{fileContent?.name}
				</div>

				<div className={styles.labeledInput}>
					<HoverHelp message={dictionaryT("wordSeperatorHelp")} />
					<label className={styles.label}>
						{dictionaryT("wordSeperator")}:
					</label>
					<TextInput
						required
						value={wordSeperator}
						onChange={setWordSeperator}/>
				</div>

				<div className={styles.labeledInput}>
					<HoverHelp message={dictionaryT("pairSeperatorHelp")} />
					<label className={styles.label}>
						{dictionaryT("pairSeperator")}:
					</label>
					<TextInput
						required
						value={pairSeperator}
						onChange={setPairSeperator}/>
				</div>

				<ThemedButton
					label={dictionaryT("useDefault")}
					onClick={setDefaultDictInputs}
					className={styles.useDefaultButton}
					loading={settingDefaults}/>
				<ThemedButton
					label={dictionaryT("create")}
					onClick={createDictionaryArray}
					className={styles.createArrayButton}
					disabled={!fileContent || !wordSeperator || !pairSeperator}
					loading={creating}/>

				{arrDict &&
					<div className={styles.createdArray}>
						<p className={styles.createdText}>
							{dictionaryT("dictionaryCreated")}
						</p>
						<p className={styles.infoText}>
							{arrDict.dictArray.length} {dictionaryT("wordsFound")}
						</p>
					</div>
				}
			</div>

		</div>
	)
}






export default CreateDictionaryArray