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


	const minIndex = -1
	const maxIndex = suggestions.length - 1
	const indexInRange = (index: number) => inRange(index, minIndex, maxIndex)

	const showSuggestions = () => {
		setIsVisible(true)
	}
	const hideSuggestions = () => {
		setIsVisible(false)
		setFocusedIndex(-1)
	}


	const keyHandler = createKeyHandler({
		ArrowUp(e) {
			e.preventDefault()
			if (!isVisible)
				return
			const newIndex = indexInRange(focusedIndex-1)

			setFocusedIndex(newIndex)
		},
		ArrowDown(e) {
			e.preventDefault()
			if (!isVisible)
				showSuggestions()
			else {
				const newIndex = indexInRange(focusedIndex+1)

				setFocusedIndex(newIndex)
			}
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
		isVisible: isVisible && suggestions.length > 0,
		showSuggestions,
		hideSuggestions,
		setFocusedIndex,
		keyHandler,
	}
}

export default useInputSuggestions