import { KeyboardEventHandler, useEffect, useState } from "react"

import TextInput from "../TextInput/TextInput"

import styles from "./TextInputWithSuggestions.module.scss"




type Props = {
    value: string
    onChange: ((text: string) => void)
    options: string[]
    onSelectSuggestion: (selected: string) => void
    numberOfSuggestions?: number
    onEnter?: () => void
}

const TextInputWithSuggestions: React.FC<Props> = ({
	value,
	onChange,
	options,
	onSelectSuggestion,
	numberOfSuggestions = 3,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	onEnter = () => {}
}) => {
	const [focusedId, setFocusedId] = useState(-1)
	const [isShowing, setIsShowing] = useState(false)
	// To be showed when:
	// On input focus
	// When started writing

	// To be hidden when:
	// Suggestion selected
	// Pressed ESC
	// On input blur

	useEffect(() => {
		setFocusedId(-1)
	}, [value])

	const suggestions = value.length > 0 ?
		options
			.filter(word => word.includes(value) && word !== value)
			.slice(0, numberOfSuggestions):
		[]


	const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
		console.log(e.key)
		if (e.key === "ArrowUp"){
			e.preventDefault()
			setFocusedId(p => p-1 <= -1? suggestions.length-1 : p-1 )
		}
		if (e.key === "ArrowDown"){
			e.preventDefault()
			setFocusedId(p => p+1 >= suggestions.length? 0:p+1)
		}
		if (e.key === "Enter"){
			e.preventDefault()
			focusedId === -1 ?
				onEnter():
				onSelectSuggestion(suggestions[focusedId])
		}
	}

	return (
		<div className={styles.searchSection}>
			<TextInput
				value={value}
				onChange={onChange}
				onKeyDown={handleKeyDown}
				className={styles.textInput}
			/>
			<div className={styles.suggestions}>
				{suggestions.map((word, idx) => (
					<button key={idx} className={`${styles.suggestionButton} ${focusedId === idx? styles.focused:""}`} onClick={() => {
						setFocusedId(idx)
						onSelectSuggestion(word)
					}}>
						{word}
					</button>
				))}
			</div>


		</div>
	)
}






export default TextInputWithSuggestions