import { createKeyHandler } from "@utils/create-key-handler"

import useSuggestions from "../../../hooks/use-input-suggestions"
import TextInput, { TextInputProps } from "../../atoms/TextInput/TextInput"

import styles from "./TextInputWithSuggestions.module.scss"





type Props = {
    options: string[]
    maxSuggestions?: number
	className?: string
	containerClassName?: string
	value: string
	onChange: (text: string) => void
} & TextInputProps




const TextInputWithSuggestions: React.FC<Props> = ({
	value,
	options,
	maxSuggestions = 3,
	className,
	containerClassName,
	onChange,
	onKeyDown = () => { "" },
	...props
}) => {
	const {
		suggestions,
		isVisible,
		focusedIndex,
		showSuggestions,
		hideSuggestions,
		keyHandler: suggestionKeyHandler,
	} = useSuggestions(value, options, maxSuggestions)


	const keyHandler = createKeyHandler({
		parentKeyHandler(e) {
			suggestionKeyHandler(e)
			onKeyDown(e)
		},
		Enter(_, stopParent) {
			hideSuggestions()

			if (!isVisible || focusedIndex === -1)
				return
			onChange(suggestions[focusedIndex])
			stopParent()
		},
	})


	return (
		<div className={`${styles.searchContainer} ${containerClassName}`}>
			<TextInput
				value={value}
				onChange={(text) => { onChange(text); showSuggestions() }}
				onMouseDown={showSuggestions}
				onBlur={hideSuggestions}
				onKeyDown={keyHandler}
				className={`${styles.textInput} ${className}`}
				{...props}
			/>
			{isVisible &&
				<div className={styles.suggestions}>
					{suggestions.map((word, idx) => (
						<button
							key={idx}
							className={`${styles.suggestion} ${focusedIndex === idx? styles.focused:""}`}
							onMouseDown={() => {
								onChange(word)
								hideSuggestions()
							}}>
							{word}
						</button>
					))}
				</div>
			}
		</div>
	)
}






export default TextInputWithSuggestions