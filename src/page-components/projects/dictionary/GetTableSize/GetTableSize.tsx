import { Dispatch, SetStateAction } from "react"
import { useTranslation } from "next-i18next"

import NumberInput from "../../../../components/NumberInput/NumberInput"
import ThemedButton from "../../../../components/ThemedButton/ThemedButton"
import { DictionaryArray } from "../../../../projects-src/hashtabledict/types"
import { findAPrimeBiggerThan } from "../../../../projects-src/hashtabledict/utils"

import styles from "./GetTableSize.module.scss"



type State<T> = [T, Dispatch<SetStateAction<T>>]
type Props = {
    hashTableSizeState: State<number>
    dictionaryArray: DictionaryArray | undefined
}

const GetTableSize: React.FC<Props> = ({
	hashTableSizeState,
	dictionaryArray,
}) => {
	const [hashTableSize, setHashTableSize] = hashTableSizeState
	const { t: dictionaryT } = useTranslation("dictionary")
	const loadFactor = dictionaryArray ?
		(dictionaryArray.length / hashTableSize).toFixed(3):
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
					if (dictionaryArray)
						setHashTableSize(findAPrimeBiggerThan(dictionaryArray.length * 4))
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