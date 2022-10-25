import { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './ThemedButton.module.scss'



type MyProps = {
    children?: ReactNode
    label?: string
    className?: string
}
type Props = MyProps & ButtonHTMLAttributes<HTMLButtonElement>

const ThemedButton: React.FC<Props> = ({ 
    children,
    label,
    className,
    ...props
 }) => {


    return (
        <button
            className={`${styles.button} ${className}`}
            {...props}
        >
            {label || children}
        </button>
    )
}






export default ThemedButton