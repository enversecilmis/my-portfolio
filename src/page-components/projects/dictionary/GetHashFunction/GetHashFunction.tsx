import { Dispatch, SetStateAction } from 'react'
import CodeInput from '../../../../components/CodeInput/CodeInput'
import ThemedButton from '../../../../components/ThemedButton/ThemedButton'
import styles from './GetHashFunction.module.scss'


const hashFunctionBoilerplate = `const hashFunction = (input: string): number => {`
const defaultHashFunctionString = `const g = 17
let hash = 0

for(let i=0; i<input.length; i++)
    hash += input.charCodeAt(i) * g**i

return hash`



type State<T> = [T, Dispatch<SetStateAction<T>>]
type Props = {
    hashFunctionStringState: State<string>
}

const GetHashFunction: React.FC<Props> = ({
    hashFunctionStringState,
}) => {
    const [hashFunctionString, setHashFunctionString] = hashFunctionStringState


    return (
        <div className={styles.inputStep}>
            <h3 className={styles.stepTitle}>Hash Function</h3>
            <CodeInput
                required
                className={styles.codeInput}
                editorClassName={styles.editor}
                boilerplateTop={hashFunctionBoilerplate}
                boilerplateBottom="}"
                value={hashFunctionString}
                onChange={setHashFunctionString}
                rows={6}
                topBarButtonLeft={
                    <ThemedButton
                        label='Use Default'
                        onClick={() => setHashFunctionString(defaultHashFunctionString)}
                    />
                }
            />
        </div>
    )
}






export default GetHashFunction