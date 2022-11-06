import React, { ReactNode, useMemo, useState } from 'react'
import styles from './Carousel.module.scss'
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";




type Props = {
	className?: string
	sliderClassName?: string,
	titleClassName?: string
	children: JSX.Element | JSX.Element[]
}
type ItemProps = {
	children?: ReactNode | ReactNode[]
	className?: string
	sliderTitle?: string
}
type CarouselComponent = React.FC<Props> & {Item: React.FC<ItemProps>}




const Carousel: CarouselComponent = ({
	children,
	className,
	sliderClassName,
	titleClassName,
}) => {
	const [activeIndex, setActiveIndex] = useState(0)
	const childCount = React.Children.count(children)
	const titles: string[] = useMemo(() =>
		React.Children.map(children, child => child.props.sliderTitle || ''),
		[children]
	)

	const previous = () => setActiveIndex(p => p-1 < 0 ? childCount-1 : p-1)
	const next = () => setActiveIndex(p => p+1 > childCount-1 ? 0 : p+1)

	
	
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
					<div key={idx} className={styles.itemContainer}>
						{child}
					</div>
				))}
			</div>

			<button
				className={`${styles.navButtons} ${styles.previousButton}`}
				onClick={previous}
			>
				<BsChevronCompactLeft/>
			</button>
			<button
				className={`${styles.navButtons} ${styles.nextButton}`}
				onClick={next}
			>
				<BsChevronCompactRight/>
			</button>
		</div>
	)
}

Carousel.Item = ({ children, className }) => (
	<div className={className}>{children}</div>
)
Carousel.Item.displayName = "Carousel.Item"




export default Carousel
