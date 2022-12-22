import React, { FormEventHandler, ReactNode, useState } from "react"
import ThemedButton from "@components/atoms/ThemedButton/ThemedButton"
import { AnimatePresence, motion } from "framer-motion"
import { useTranslation } from "next-i18next"

import styles from "./MultistepForm.module.scss"



// TODO: Remake this component with BoxSection component.

type Props = {
    className?: string
    onFinish?: () => void
    children: JSX.Element | JSX.Element[]
}
type OnNextFunction = () => boolean | Promise<boolean> | void
type ItemProps = {
    disableNext?: boolean
	/**
	 * Returned boolean value determines whether or not to go next.
	 * If it doesn't return a value, proceeds to the next step.
	 */
	onNext?: OnNextFunction
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
 * Every react child becomes a step.
 * It won't let you go next if there's empty required fields inside.
 * To control `next` buttons disabled state, use `MultistepForm.Item` component.
 */
const MultistepForm: MultiStepForm = ({
	onFinish = () => { "" },
	children,
	className,
}) => {
	const [stepIndex, setStepIndex] = useState(0)
	const [direction, setDirection] = useState(0)
	const [finishing, setFinishing] = useState(false)
	const { t: commonT } = useTranslation("common")

	const childrenArray = React.Children.toArray(children) as JSX.Element[]
	const renderedChild = childrenArray[stepIndex]
	const lastIndex = childrenArray.length - 1


	const nextOrFinish: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault()
		const onNext: OnNextFunction | undefined = renderedChild.props.onNext
		const val = onNext && await onNext()
		const canProceed = val || val === undefined

		// If true or undefined returned, proceed.
		if (!canProceed)
			return

		setFinishing(true)
		stepIndex === lastIndex ?
			await onFinish():
			next()
		setFinishing(false)
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
					label={stepIndex === lastIndex ?
						commonT("finish"):
						commonT("next")
					}
					className={styles.button}
					disabled={renderedChild.props.disableNext}
					loading={finishing}
				/>
			</div>
		</form>
	)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Item: ItemType = ({ children, disableNext }) => <>{children}</>

MultistepForm.Item = Item




export default MultistepForm