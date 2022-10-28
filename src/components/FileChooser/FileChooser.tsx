import { InputHTMLAttributes, useEffect } from 'react'
import { FileContent, useFilePicker } from 'use-file-picker'
import ThemedButton from '../ThemedButton/ThemedButton'
import styles from './FileChooser.module.scss'




type MyCommonProps = {
    label?: string
    fileSelected?: boolean
    onClick?: () => void
}

type MyProps = MyCommonProps & ({
    multiple: true
    onChange: (fileContent: FileContent[]) => void

} | {
    multiple: false
    onChange: (fileContent: FileContent) => void
})
type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>,"onChange"|"multiple"|"onClick">
type Props =  MyProps & InputProps


/**
 * 
 * If you're going to use `required` prop,
 * also use `fileSelected` prop to determine whether
 * or not there is a selected file.
 */
const FileChooser: React.FC<Props> = ({
    label,
    accept,
    multiple,
    onChange,
    onClick,
    required,
    fileSelected,
    ...props
}) => {

    const [openFileChooser, { filesContent }] = useFilePicker({
        accept: accept,
        multiple: multiple,
    })

    useEffect(() => {
        if(filesContent.length === 0)
            return
        
        multiple?
            onChange(filesContent):
            onChange(filesContent[0])
    }, [filesContent])
    

    const req = !fileSelected && (required && filesContent.length === 0)

    return (
        <ThemedButton
            className={styles.button}
            onClick={(e) => {
                e.preventDefault()
                onClick && onClick()
                openFileChooser()
            }}
        >
            <input
                className={styles.input}
                type="file"
                accept={accept}
                multiple={multiple}
                required={req}
                {...props}
            />
            {label}
        </ThemedButton>
    )
}






export default FileChooser