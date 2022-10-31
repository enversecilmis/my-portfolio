import React, { Children, FormEventHandler, ReactElement, ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import ThemedButton from '../ThemedButton/ThemedButton'
import styles from './MultistepForm.module.scss'
import { AnimatePresence, motion } from "framer-motion"





type Props = {
    className?: string
    onFinish?: () => void
    children: ReactNode | ReactNode[]
}



const variants = {
    stand: {
        x: 0,
        opacity: 1
    },
    enter: (direction: number) => ({
        x: direction*100,
        opacity: 0.5
    }),
    exit: (direction: number) => ({
        x: direction*-100,
        opacity: 0,
        zIndex: 0
    })
}

/**
 * Every react children becomes a step.
 * You can disable `next` button on each step
 * by wraping your component with `MultiStepInput.StepItem` component.
 */
const MultistepForm: React.FC<Props> = ({
    onFinish = () => {},
    children,
    className
}) => {
    const [stepIndex, setStepIndex] = useState(0)
    const [direction, setDirection] = useState(0)

    const childrenArray = React.Children.toArray(children)
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
                        x: { type: "keyframes", ease: "easeOut", duration: .3 }
                    }}
                    initial="enter"
                    animate="stand"
                    exit="exit"
                >
                    {childrenArray[stepIndex]}
                </motion.div>
            </AnimatePresence>
            <div className={styles.buttons}>
                <ThemedButton
                    type='button'
                    onClick={previous}
                    label="Previous"
                    className={styles.button}
                    disabled={stepIndex===0}
                />
                <ThemedButton
                    type='submit'
                    label={stepIndex === lastIndex ? "Finish" : "Next"}
                    className={styles.button}
                />
            </div>
        </form>
    )
}






export default MultistepForm