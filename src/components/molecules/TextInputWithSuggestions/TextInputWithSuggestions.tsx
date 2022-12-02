import { createKeyHandler } from "@utils/create-key-handler"

import useSuggestions from "../../../hooks/use-input-suggestions"
import TextInput, { TextInputProps } from "../../atoms/TextInput/TextInput"

import styles from "./TextInputWithSuggestions.module.scss"





type Props = {
    options: string[]
    maxSuggestions?: number
	className?: string
	InputClassName?: string
} & TextInputProps

const TextInputWithSuggestions: React.FC<Props> = ({
	value,
	options,
	maxSuggestions = 3,
	className,
	InputClassName,
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
	} =useSuggestions(value, options, maxSuggestions)


	const keyHandler = createKeyHandler({
		parentKeyHandler(e) {
			suggestionKeyHandler(e)
			onKeyDown(e)
		},
		Enter(_, stopParent) {
			if (!isVisible)
				return
			onChange(suggestions[focusedIndex])
			hideSuggestions()
			stopParent()
		},
	})

	return (
		<div className={`${styles.searchSection} ${className}`}>
			<TextInput
				value={value}
				onChange={(text) => { onChange(text); showSuggestions() }}
				onFocus={showSuggestions}
				onBlur={hideSuggestions}
				onKeyDown={keyHandler}
				className={`${styles.textInput} ${InputClassName}`}
				{...props}
			/>
			{isVisible &&
				<div className={styles.suggestions}>
					{suggestions.map((word, idx) => (
						<button
							key={idx}
							className={`${styles.suggestion} ${focusedIndex === idx? styles.focused:""}`}
							onMouseDown={() => {
								onChange(suggestions[idx])
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