import { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './ThemedButton.module.scss'
import { AiOutlineLoading3Quarters } from "react-icons/ai"

type MyProps = {
    children?: ReactNode
    label?: string
    className?: string
    loading?: boolean
}
type Props = MyProps & ButtonHTMLAttributes<HTMLButtonElement>

const ThemedButton: React.FC<Props> = ({ 
    children,
    label,
    className,
    loading,
    type="button",
    ...props
 }) => {


    return (
        <button
            className={`${styles.button} ${className}`}
            type={type}
            {...props}
        >
            <span className={loading? styles.hideLabel:""}>{label || children}</span>
            {loading && <AiOutlineLoading3Quarters className={styles.spinner}/>}

        </button>
    )
}






export default ThemedButton