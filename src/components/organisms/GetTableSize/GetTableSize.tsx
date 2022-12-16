import { Dispatch, SetStateAction } from "react"
import NumberInput from "@components/atoms/NumberInput/NumberInput"
import ThemedButton from "@components/atoms/ThemedButton/ThemedButton"
import { useTranslation } from "next-i18next"

import { ArrayDictionary } from "../../../projects-src/hashtabledict/hashtabledict"
import { findAPrimeBiggerThan } from "../../../projects-src/hashtabledict/utils"

import styles from "./GetTableSize.module.scss"



type State<T> = [T, Dispatch<SetStateAction<T>>]
type Props = {
    hashTableSizeState: State<number>
    arrDict: ArrayDictionary | undefined
}

const GetTableSize: React.FC<Props> = ({
	hashTableSizeState,
	arrDict,
}) => {
	const [hashTableSize, setHashTableSize] = hashTableSizeState
	const { t: dictionaryT } = useTranslation("dictionary")
	const loadFactor = arrDict ?
		(arrDict.dictArray.length / hashTableSize).toFixed(3):
		0

	return (
		<div className={styles.inputStep}>
			<h3 className={styles.stepTitle}>{dictionaryT("hashTableSize")}</h3>
			<div className={styles.content}>
				<NumberInput
					required
					value={hashTableSize}
					onChange={setHashTableSize}
				/>
				<ThemedButton label={dictionaryT("useRecommended")} onClick={() => {
					if (arrDict)
						setHashTableSize(findAPrimeBiggerThan(arrDict.dictArray.length * 4))
				}} />
			</div>
			<div
				className={styles.content}
				style={loadFactor >= 1 ? { color: "red" }: {}}
			>
				<span>{dictionaryT("loadFactor")}:</span>
				<span>{loadFactor}</span>
			</div>
		</div>
	)
}






export default GetTableSize