import React, { InputHTMLAttributes } from "react"

import styles from "./TextInput.module.scss"




type MyProps = {
    onChange?: (text: string) => void
}
type InputElementProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "type">
type Props = MyProps & InputElementProps
type TextInputComponent = React.ForwardRefRenderFunction<HTMLInputElement, Props>



const TextInput: TextInputComponent = ({
	onChange = () => { "" },
	className,
	...props
}, ref) => {
	return (
		<input
			ref={ref}
			className={`${styles.input} ${className}`}
			onChange={e => onChange(e.target.value)}
			type="text"
			{...props}
		/>
	)
}




export type TextInputProps = Props
export default React.forwardRef(TextInput)