import { forwardRef, InputHTMLAttributes } from "react"

import styles from "./NumberInput.module.scss"

// TODO: Make it forward ref.
// TODO: Create a base input field for this and TextInput component.


type MyProps = {
    onChange: (number: number) => void
}

type InputProps = InputHTMLAttributes<HTMLInputElement>

type Props = MyProps & Omit<InputProps, "onChange" | "type">

type NumberInputComponent = React.ForwardRefRenderFunction<HTMLInputElement, Props>


const NumberInput: NumberInputComponent = ({
	onChange,
	className,
	...rest
}, ref) => {
	return (
		<input
			ref={ref}
			className={`${styles.input} ${className}`}
			onChange={e => onChange(e.target.valueAsNumber)}
			onWheel={e => e.currentTarget.blur()}
			type="number"
			{...rest}
		/>
	)
}






export default forwardRef(NumberInput)