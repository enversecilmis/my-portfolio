import { ReactNode } from "react"
import { AllOrNone } from "@utils/types"

import styles from "./BoxSection.module.scss"


type HeadingProps = {
	hTag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
	heading: string
}
type Props = {
	children: ReactNode
	className?: string
} & AllOrNone<HeadingProps>

const BoxSection: React.FC<Props> = ({
	heading,
	hTag: HTag,
	children,
	className,
}) => {
	return (
		<section className={styles.container}>
			{heading &&
			<HTag className={styles.title}>{heading}</HTag>
			}

			<div className={className}>
				{children}
			</div>
		</section>
	)
}






export default BoxSection