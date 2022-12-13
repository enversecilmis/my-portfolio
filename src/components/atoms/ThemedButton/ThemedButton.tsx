import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

import styles from "./ThemedButton.module.scss"



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
	onClick,
	...props
}) => {
	const labelClass = loading? styles.hideLabel:""
	const displayedLabel = label || children
	const handleOnClick: MouseEventHandler<HTMLButtonElement> = (e) => {
		if (!loading)
			onClick && onClick(e)
	}

	return (
		<button
			className={`${styles.button} ${className}`}
			type={type}
			onClick={handleOnClick}
			{...props}
		>
			{/* This part is done the way it is to prevent layout shift. */}
			<span className={labelClass}>{displayedLabel}</span>
			{loading && <AiOutlineLoading3Quarters className={styles.spinner}/>}
		</button>
	)
}






export default ThemedButton