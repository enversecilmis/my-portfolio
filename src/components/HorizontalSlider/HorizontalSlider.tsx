import React, { ReactNode, useEffect, useState } from 'react'
import styles from './HorizontalSlider.module.scss'
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";



type SliderProps = {
	className?: string
	children: JSX.Element | JSX.Element[]
	previousButtonChild?: ReactNode
	nextButtonChild?: ReactNode
	previousButtonClassName?: string,
	nextButtonClassName?: string
	activeItemClassName?: string
	nonActiveItemClassName?: string
}
type SliderItemProps = {
	children: ReactNode | ReactNode[]
	className?: string
	sliderTitle?: string
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
	const titles: string[] = React.Children.map(children, child => child.props.sliderTitle || '')
	
	

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


			<SliderTitle key={titles[activeIndex]} className={styles.sliderTitle}>
				{titles[activeIndex]}
			</SliderTitle>

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





const SliderTitle: React.FC<{title?: string, className?: string, children?: string}> = ({title, className, children}) => {

	
	return (
		<h4 className={className}>{children}</h4>
	)
}

const SliderItem: React.FC<SliderItemProps> = ({ children, className }) => (
	<div className={className}>{children}</div>
)

export {
	SliderItem
}
export default HorizontalSlider
