import { Dispatch, SetStateAction } from "react"
import { useTranslation } from "next-i18next"

import HoverHelp from "../../atoms/HoverHelp/HoverHelp"
import ThemedButton from "../../atoms/ThemedButton/ThemedButton"
import CodeInput from "../../molecules/CodeInput/CodeInput"

import styles from "./GetCollisionHandler.module.scss"


const collisionHandlerBoilerplate = `const collisionHandler = (
    currentHashValue: number,
    input: string,
    iteration: number
): number => {`

const defaultCollisionHandlerString = "return currentHashValue*input.length + iteration ** 2"


type State<T> = [T, Dispatch<SetStateAction<T>>]
type Props = {
    collisionHandlerStringState: State<string>
    throwCollisionLoopErrorState: State<boolean>
}

const GetCollisionHandler: React.FC<Props> = ({
	collisionHandlerStringState,
	throwCollisionLoopErrorState,
}) => {
	const [collisionHandlerString, setCollisionHandlerString] = collisionHandlerStringState
	const [throwCollisionLoopError, setThrowCollisionLoopError] = throwCollisionLoopErrorState
	const { t: dictionaryT } = useTranslation("dictionary")


	return (
		<div className={styles.inputStep}>
			<h3 className={styles.stepTitle}>{dictionaryT("collisionHandler")}</h3>
			<CodeInput
				required
				className={styles.codeInput}
				editorClassName={styles.codeTextArea}
				boilerplateTop={collisionHandlerBoilerplate}
				boilerplateBottom="}"
				value={collisionHandlerString}
				onChange={setCollisionHandlerString}
				rows={4}
				topBarButtonLeft={
					<ThemedButton
						label={dictionaryT("useDefault")}
						onClick={(e) => {
							e.stopPropagation()
							setCollisionHandlerString(defaultCollisionHandlerString)
						}}
					/>
				}
				topBarButtonRight={<HoverHelp message={dictionaryT("collisionHandlerHelp")} />}
			/>
			<div className={styles.labeledInput}>
				<HoverHelp message={dictionaryT("throwInfiniteLoopErrorHelp")} />
				<label
					className={styles.label}
					htmlFor={styles.throwLoopError}
				>
					{dictionaryT("throwInfiniteLoopError")}:
				</label>
				<input
					id={styles.throwLoopError}
					type="checkbox"
					checked={throwCollisionLoopError}
					onChange={(e) => setThrowCollisionLoopError(e.target.checked)}
				/>
			</div>
		</div>
	)
}






export default GetCollisionHandler