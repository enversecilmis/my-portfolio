import React, { Children, FormEventHandler, ReactElement, ReactNode, useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useTranslation } from "next-i18next"

import ThemedButton from "../ThemedButton/ThemedButton"

import styles from "./MultistepForm.module.scss"





type Props = {
    className?: string
    onFinish?: () => void
    children: JSX.Element | JSX.Element[]
}
type ItemProps = {
    disableNext?: boolean
    children?: ReactNode
}
type ItemType = React.FC<ItemProps>
type MultiStepForm = React.FC<Props> & { Item: ItemType }


const variants = {
	stand: {
		x: 0,
		opacity: 1,
	},
	enter: (direction: number) => ({
		x: direction*100,
		opacity: 0.5,
	}),
	exit: (direction: number) => ({
		x: direction*-100,
		opacity: 0,
		zIndex: 0,
	}),
}


/**
 * Every react children becomes a step.
 */
const MultistepForm: MultiStepForm = ({
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	onFinish = () => {},
	children,
	className,
}) => {
	const [stepIndex, setStepIndex] = useState(0)
	const [direction, setDirection] = useState(0)
	const { t: commonT } = useTranslation("common")

	const childrenArray = React.Children.toArray(children) as JSX.Element[]
	const renderedChild = childrenArray[stepIndex]
	const lastIndex = childrenArray.length - 1



	const nextOrFinish: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault()
		stepIndex === lastIndex ?
			onFinish():
			next()
	}
	const next = () => {
		setStepIndex(p => p >= lastIndex ? lastIndex : p + 1)
		setDirection(1)
	}
	const previous = () => {
		setStepIndex(p => p === 0 ? 0 : p - 1)
		setDirection(-1)
	}


	return (
		<form
			className={`${styles.container} ${className}`}
			onSubmit={nextOrFinish}
		>
			<div className={styles.stepTag}>{stepIndex + 1}/{lastIndex + 1}</div>
			<AnimatePresence initial={false} custom={direction} mode="popLayout">
				<motion.div
					key={stepIndex}
					custom={direction}
					className={styles.stepContainer}
					variants={variants}
					transition={{
						opacity: { type: "keyframes", duration: .3 },
						x: { type: "keyframes", ease: "easeOut", duration: .3 },
					}}
					initial="enter"
					animate="stand"
					exit="exit"
				>
					{renderedChild}
				</motion.div>
			</AnimatePresence>
			<div className={styles.buttons}>
				<ThemedButton
					type="button"
					onClick={previous}
					label={commonT("previous")}
					className={styles.button}
					disabled={stepIndex===0}
				/>
				<ThemedButton
					type="submit"
					label={stepIndex === lastIndex ? commonT("finish") : commonT("next")}
					className={styles.button}
					disabled={renderedChild.props.disableNext}
				/>
			</div>
		</form>
	)
}

const Item: ItemType = ({ children, disableNext }) => <>{children}</>

MultistepForm.Item = Item




export default MultistepForm