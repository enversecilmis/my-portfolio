import { DetailedHTMLProps, InputHTMLAttributes, useRef } from "react"

import styles from "./NumberInput.module.scss"



type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type Props = Omit<InputProps, "onChange"> & {
    title?: string
    onChange: (number: number) => void
}

const NumberInput: React.FC<Props> = ({ onChange, title, ...rest }) => {
	const input = useRef<HTMLInputElement>(null)

	return (
		<div className={styles.container}>
			{title && <span className={styles.title}>{title} </span>}
			<input
				ref={input}
				className={styles.input}
				{...rest}
				onChange={e => {
					const numText = e.target.value.replace(/^0+/, "")
					let value = parseInt(numText)*2/2

					value = e.target.valueAsNumber


					if (isNaN(value))
						onChange(0)
					else
						onChange(value)
				}}
				type="number"
			/>
		</div>
	)
}






export default NumberInput