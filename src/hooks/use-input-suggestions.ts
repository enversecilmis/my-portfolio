import { useMemo, useState } from "react"
import { createKeyHandler } from "@utils/create-key-handler"
import { inRange } from "@utils/in-range"




const useInputSuggestions = (
	value: string,
	options: string[],
	maxSuggestions: number,

) => {
	const [focusedIndex, setFocusedIndex] = useState(-1)
	const [isVisible, setIsVisible] = useState(false)

	const suggestions = useMemo(
		() => options
			.filter(word => word.startsWith(value) && word !== value)
			.slice(0, maxSuggestions),
		[value, maxSuggestions, options],
	)


	const showSuggestions = () => {
		if (suggestions.length > 0)
			setIsVisible(true)
		else
			hideSuggestions()
	}
	const hideSuggestions = () => {
		setIsVisible(false)
		setFocusedIndex(-1)
	}


	const keyHandler = createKeyHandler<HTMLInputElement>({
		ArrowUp(e) {
			e.preventDefault()
			setFocusedIndex(inRange(focusedIndex-1, 0, suggestions.length))
		},
		ArrowDown(e) {
			e.preventDefault()
			setFocusedIndex(inRange(focusedIndex+1, 0, suggestions.length))
			showSuggestions()
		},
		Enter(_, stopParent) {
			if (focusedIndex !== -1) {
				setFocusedIndex(focusedIndex)
				hideSuggestions()
				stopParent()
			}
		},
		Escape() {
			hideSuggestions()
		},
	})



	return {
		suggestions,
		focusedIndex,
		isVisible,
		showSuggestions,
		hideSuggestions,
		setFocusedIndex,
		keyHandler,
	}
}

export default useInputSuggestions