import { Dispatch, SetStateAction } from 'react'
import CodeInput from '../../../../components/CodeInput/CodeInput'
import HoverHelp from '../../../../components/HoverHelp/HoverHelp'
import ThemedButton from '../../../../components/ThemedButton/ThemedButton'
import styles from './GetCollisionHandler.module.scss'


const collisionHandlerBoilerplate = `const collisionHandler = (
    currentHashValue: number,
    input: string,
    iteration: number
): number => {`

const defaultCollisionHandlerString = `return currentHashValue*input.length + iteration ** 2`


type State<T> = [T, Dispatch<SetStateAction<T>>]
type Props = {
    collisionHandlerStringState: State<string>
    throwInfiniteLoopErrorState: State<boolean>
}

const GetCollisionHandler: React.FC<Props> = ({
    collisionHandlerStringState,
    throwInfiniteLoopErrorState,
}) => {
    const [collisionHandlerString, setCollisionHandlerString] = collisionHandlerStringState
    const [throwInfiniteLoopError, setThrowInfiniteLoopError] = throwInfiniteLoopErrorState

    
    return (
        <div className={styles.inputStep}>
            <h3 className={styles.stepTitle}>Collision Handler</h3>
            <CodeInput
                required
                className={styles.codeInput}
                editorClassName={styles.codeTextArea}
                boilerplateTop={collisionHandlerBoilerplate}
                boilerplateBottom="}"
                value={collisionHandlerString}
                onChange={setCollisionHandlerString}
                rows={4}
                topBarButtonLeft={
                    <ThemedButton
                        label='Use Default'
                        onClick={(e) => {
                            e.stopPropagation()
                            setCollisionHandlerString(defaultCollisionHandlerString)
                        }}
                    />
                }
                topBarButtonRight={<HoverHelp message="When hash indexes collide this function is called to get the next index." />}
            />
            <div className={styles.labeledInput}>
                <HoverHelp message="Set this option if you don't use iteration parameter in collision handler function." />
                <label className={styles.label} htmlFor={styles.throwLoopError}>Throw Infinite Collision Loop Error:</label>
                <input
                    id={styles.throwLoopError}
                    type="checkbox"
                    checked={throwInfiniteLoopError}
                    onChange={(e) => setThrowInfiniteLoopError(e.target.checked)}
                />
            </div>
        </div>
    )
}






export default GetCollisionHandler