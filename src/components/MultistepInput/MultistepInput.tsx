import { Children, FormEventHandler, ReactNode, useState } from 'react'
import ThemedButton from '../ThemedButton/ThemedButton'
import styles from './MultistepInput.module.scss'
import { AnimatePresence, motion } from "framer-motion"


type Props = {
    onFinish: () => void
    children?: ReactNode | ReactNode[]
}

/**
 * Every react children becomes a step.
 */
const MultistepInput: React.FC<Props> = ({ 
    onFinish,
    children,
 }) => {
    const [stepIndex, setStepIndex] = useState(0)
    const childrenArray = Children.toArray(children)
    const lastIndex = childrenArray.length-1


    const nextOrFinish: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        stepIndex === lastIndex?
            onFinish():
            next()
    }

    const next = () => setStepIndex(p => p >= lastIndex? lastIndex:p+1)
    const previous = () => setStepIndex(p => p === 0? 0:p-1)
    
    return (
        <form
            className={styles.container}
            onSubmit={nextOrFinish}
        >
            <div className={styles.stepTag}>{stepIndex+1}/{lastIndex+1}</div>
            {childrenArray[stepIndex]}
            <div className={styles.buttons}>
                <ThemedButton
                    type='button'
                    onClick={previous}
                    label="Previous"
                    className={styles.button}
                />
                <ThemedButton
                    type='submit'
                    label={stepIndex === lastIndex? "Finish":"Next"}
                    className={styles.button}
                />
            </div>
        </form>
    )
}






export default MultistepInput