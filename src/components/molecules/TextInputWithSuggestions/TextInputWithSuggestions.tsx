import { KeyboardEventHandler, useEffect, useState } from "react"

import TextInput from "../../atoms/TextInput/TextInput"

import styles from "./TextInputWithSuggestions.module.scss"




type Props = {
    value: string
    onChange: ((text: string) => void)
    options: string[]
    onSelectSuggestion: (selected: string) => void
    numberOfSuggestions?: number
    onEnter?: () => void
	className?: string
	InputClassName?: string
}

const TextInputWithSuggestions: React.FC<Props> = ({
	value,
	onChange,
	options,
	onSelectSuggestion,
	numberOfSuggestions = 3,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	onEnter = () => {},
	className,
	InputClassName,
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
			.filter(word => word.startsWith(value) && word !== value)
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
			setFocusedId(p => p+1 >= suggestions.length? 0 : p+1)
			showSuggestions()
		}
		if (e.key === "Enter"){
			e.preventDefault()
			hideSuggestions()
			focusedId === -1 ?
				onEnter():
				onSelectSuggestion(suggestions[focusedId])
		}
		if (e.key === "Escape"){
			e.preventDefault()
			hideSuggestions()
		}
	}

	const handleOnChange = (text: string) => {
		onChange(text)
		showSuggestions()
	}
	const handleFocus = () => {
		showSuggestions()
	}
	const handleOnBlur = () => {
		hideSuggestions()
	}
	const showSuggestions = () => {
		setIsShowing(true)
	}
	const hideSuggestions = () => {
		setFocusedId(-1)
		setIsShowing(false)
	}

	return (
		<div className={`${styles.searchSection} ${className}`}>
			<TextInput
				value={value}
				onChange={handleOnChange}
				onKeyDown={handleKeyDown}
				onFocus={handleFocus}
				onBlur={handleOnBlur}
				className={`${styles.textInput} ${InputClassName}`}
			/>
			<div className={styles.suggestions}>
				{isShowing &&
				suggestions.map((word, idx) => (
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