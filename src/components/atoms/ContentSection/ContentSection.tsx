import { HTMLAttributes } from "react"
import Heading from "@components/atoms/Heading/Heading"
import { AllOrNone } from "@utils/types"

import styles from "./ContentSection.module.scss"




type HeadingProps = {
	hTag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
	heading: string
}
type Props =
	HTMLAttributes<HTMLElement> &
	AllOrNone<HeadingProps> &
	{ containerClassName?: string}


/**
 * Pretty much a section tag that keeps the content in the middle.
 * So that the content is comfartably visible in large screens.
 * Also can take a `heading` prop which requires `hTag` property
 * and puts a nice heading at the top.
 */
const ContentSection: React.FC<Props> = ({
	heading,
	hTag: HTag,
	className,
	children,
	containerClassName,
	...props
}) => {
	return (
		<section className={`${styles.container} ${containerClassName}`}>
			{heading && <Heading headingText={heading} hTag={HTag}/>}

			<div className={`${styles.content} ${className}`} {...props}>
				{children}
			</div>
		</section>
	)
}




export default ContentSection