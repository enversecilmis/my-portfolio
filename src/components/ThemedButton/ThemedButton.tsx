import { ReactNode } from 'react'
import styles from './ThemedButton.module.scss'



type Props = {
    children?: ReactNode
    label?: string
    onClick?: () => void
    disabled?: boolean
}

const ThemedButton: React.FC<Props> = ({ 
    children,
    label,
    onClick,
    disabled
 }) => {


    return (
        <button
            className={styles.button}
            onClick={onClick}
            disabled={disabled}
        >
            {label || children}
        </button>
    )
}






export default ThemedButton