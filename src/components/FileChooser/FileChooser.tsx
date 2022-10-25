import { useEffect } from 'react'
import { FileContent, useFilePicker } from 'use-file-picker'
import ThemedButton from '../ThemedButton/ThemedButton'
import styles from './FileChooser.module.scss'




type Props = {
    label: string
    title?: string
    onChange: (fileContent: FileContent) => void
}

const FileChooser: React.FC<Props> = ({ label, title, onChange }) => {

    const [openFileChooser, { filesContent, loading }] = useFilePicker({
        accept: ".txt",
        multiple: false,
    })

    useEffect(() => {
        const file = filesContent[0]
        if (file)
            onChange(file)
    }, [filesContent])
    

    return (
        <div className={styles.container}>
            {title && <span className={styles.title}>{title}</span>}
            <ThemedButton
                onClick={openFileChooser}
            >
                {label}
            </ThemedButton>
        </div>
    )
}






export default FileChooser