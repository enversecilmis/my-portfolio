import React, { ReactNode, useState } from 'react'
import styles from './HorizontalSlider.module.scss'
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";



type SliderProps = {
	className?: string
	sliderClassName?: string,
	titleClassName?: string
	previousButtonClassName?: string,
	nextButtonClassName?: string
	activeItemContainerClassName?: string
	nonActiveItemContainerClassName?: string
	children: JSX.Element | JSX.Element[]
	previousButtonChild?: ReactNode
	nextButtonChild?: ReactNode
}
type SliderItemProps = {
	children?: ReactNode | ReactNode[]
	className?: string
	sliderTitle?: string
}





// Default props are at the end
const HorizontalSlider: React.FC<SliderProps> = ({
	children,
	className,
	sliderClassName,
	titleClassName,
	previousButtonClassName,
	nextButtonClassName,
	activeItemContainerClassName,
	nonActiveItemContainerClassName,
	previousButtonChild,
	nextButtonChild,
}) => {
	const [activeIndex, setActiveIndex] = useState(0)
	const childCount = React.Children.count(children)
	const titles: string[] = React.Children.map(children, child => child.props.sliderTitle || '')
	

	const previous = () => {
		setActiveIndex(p => p-1 < 0 ? childCount-1 : p-1)
	}
	const next = () => {
		setActiveIndex(p => p+1 > childCount-1 ? 0 : p+1)
	}

	
	return (
		<div className={`${styles.container} ${className}`}>
			<h4
				key={titles[activeIndex]}
				className={`${styles.sliderTitle} ${titleClassName}`}
			>
				{titles[activeIndex]}
			</h4>

			<div
				className={`${styles.slidingContainer} ${sliderClassName}`}
				style={{ left: `-${activeIndex*100}%` }}
			>
				{React.Children.map(children, (child, idx) => (
					<div className={`${styles.itemContainer} ${activeIndex === idx? activeItemContainerClassName : nonActiveItemContainerClassName}`}>
						{child}
					</div>
				))}
			</div>

			<button className={previousButtonClassName} onClick={previous}>
				{previousButtonChild}
			</button>
			<button className={nextButtonClassName} onClick={next}>
				{nextButtonChild}
			</button>
		</div>
	)
}




HorizontalSlider.defaultProps = {
	previousButtonClassName: styles.previousButton,
	nextButtonClassName: styles.nextButton,
	previousButtonChild: <BsChevronCompactLeft/>,
	nextButtonChild: <BsChevronCompactRight/>,
}






const SliderItem: React.FC<SliderItemProps> = ({ children, className }) => (
	<div className={className}>{children}</div>
)

export {
	SliderItem
}
export default HorizontalSlider
