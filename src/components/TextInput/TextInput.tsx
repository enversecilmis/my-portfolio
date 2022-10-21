import { useEffect, useState } from 'react'
import styles from './TextInput.module.scss'




type Props = {
    title?: string
    value?: string
    onChange: (text: string) => void
}
const TextInput: React.FC<Props> = ({
    title,
    value,
    onChange
}) => {


    return (
        <div  className={styles.container}>
            <span className={styles.title}>{title}</span>
            <input
                className={styles.input}
                type="text"
                value={value}
                onChange={e => onChange(e.target.value)}
            />
        </div>
    )
}






export default TextInput