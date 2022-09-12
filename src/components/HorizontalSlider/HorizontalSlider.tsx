import React, { ReactNode, useState } from 'react'
import styles from './HorizontalSlider.module.scss'
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";



type SliderProps = {
	className?: string
	children?: ReactNode | ReactNode[]
	previousButtonChild?: ReactNode
	nextButtonChild?: ReactNode
	previousButtonClassName?: string,
	nextButtonClassName?: string
	activeItemClassName?: string
	nonActiveItemClassName?: string
}




// Default props are at the end
const HorizontalSlider: React.FC<SliderProps> = ({
	children,
	className,
	previousButtonChild,
	nextButtonChild,
	previousButtonClassName,
	nextButtonClassName,
	activeItemClassName,
	nonActiveItemClassName
}) => {

	const [activeIndex, setActiveIndex] = useState(0)
	const childCount = React.Children.count(children)

	
	const previous = () => {
		setActiveIndex(p => p-1 < 0 ? childCount-1 : p-1)
	}
	const next = () => {
		setActiveIndex(p => p+1 > childCount-1 ? 0 : p+1)
	}

	
	return (
		<div  className={`${styles.container} ${className}`}>
			<button className={previousButtonClassName} onClick={previous}>
				{previousButtonChild}
			</button>

			<button className={nextButtonClassName} onClick={next}>
				{nextButtonChild}
			</button>

			{React.Children.map(children, (child, idx) => (
				<div
					className={`${styles.itemContainer} ${activeIndex === idx? activeItemClassName : nonActiveItemClassName}`}
					style={{ left: `-${activeIndex*100}%` }}
				>
					{child}
				</div>
			))}
		</div>
	)
}




HorizontalSlider.defaultProps = {
	previousButtonClassName: styles.previousButton,
	nextButtonClassName: styles.nextButton,
	previousButtonChild: <BsChevronCompactLeft size={40}/>,
	nextButtonChild: <BsChevronCompactRight size={40}/>,
	activeItemClassName: styles.activeItemContainer,
	nonActiveItemClassName: styles.nonActiveItemContainer,
}

export default HorizontalSlider
