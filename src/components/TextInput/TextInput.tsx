import React, { InputHTMLAttributes } from 'react'
import styles from './TextInput.module.scss'




type MyProps = {
    value?: string
    onChange?: (text: string) => void
}
type InputElementProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "type">
type Props = MyProps & InputElementProps


const TextInput: React.FC<Props> = ({
    onChange = () => {},
    className,
    ...props
}) => {
    return (
        <input
            className={`${styles.input} ${className}`}
            type="text"
            onChange={e => onChange(e.target.value)}
            {...props}
        />
    )
}





export default TextInput