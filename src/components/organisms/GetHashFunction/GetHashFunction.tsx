import { Dispatch, SetStateAction } from "react"
import { useTranslation } from "next-i18next"

import ThemedButton from "../../atoms/ThemedButton/ThemedButton"
import CodeInput from "../../molecules/CodeInput/CodeInput"

import styles from "./GetHashFunction.module.scss"


const hashFunctionBoilerplate = "const hashFunction = (input: string): number => {"
const defaultHashFunctionString = `const g = 17
let hash = 0

for(let i=0; i<input.length; i++)
    hash += input.charCodeAt(i) * g**i

return hash`



type State<T> = [T, Dispatch<SetStateAction<T>>]
type Props = {
    hashFunctionStringState: State<string>
}

const GetHashFunction: React.FC<Props> = ({ hashFunctionStringState }) => {
	const [hashFunctionString, setHashFunctionString] = hashFunctionStringState
	const { t: dictionaryT } = useTranslation("dictionary")


	return (
		<div className={styles.inputStep}>
			<h3 className={styles.stepTitle}>{dictionaryT("hashFunc")}</h3>
			<CodeInput
				required
				className={styles.codeInput}
				editorClassName={styles.codeTextArea}
				boilerplateTop={hashFunctionBoilerplate}
				boilerplateBottom="}"
				value={hashFunctionString}
				onChange={setHashFunctionString}
				rows={8}
				topBarButtonLeft={
					<ThemedButton
						label={dictionaryT("useDefault")}
						onClick={(e) => {
							e.stopPropagation()
							setHashFunctionString(defaultHashFunctionString)
						}}
					/>
				}
			/>
		</div>
	)
}






export default GetHashFunction