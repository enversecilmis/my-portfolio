import { ReactNode, useRef } from "react"

import styles from "./CodeInput.module.scss"



type Props = {
    value?: string
    onChange?: (newString: string) => void
    cols?: number
    rows?: number
    className?: string
    editorClassName?: string
    title?: string
    boilerplateTop?: string
    boilerplateBottom?: string
    topBarButtonLeft?: ReactNode
    topBarButtonRight?: ReactNode
    required?: boolean
}

const CodeInput: React.FC<Props> = ({
	value,
	onChange,
	rows = 4,
	cols = 10,
	className,
	editorClassName,
	title,
	boilerplateBottom,
	boilerplateTop,
	topBarButtonLeft,
	topBarButtonRight,
	required
}) => {
	const editor = useRef<HTMLTextAreaElement>(null)

	return (
		<div
			onClick={() => editor.current?.focus()}
			className={`${styles.container} ${className}`}
		>
			<div className={styles.topBar}>
				<div className={styles.topBarLeft}>{topBarButtonLeft}</div>
				<h4 className={styles.title}>{title}</h4>
				<div className={styles.topBarRight}>{topBarButtonRight}</div>
			</div>
			<code className={styles.codeContainer}>
				<pre className={styles.boilerplate}>{boilerplateTop}</pre>
				<textarea
					required={required}
					ref={editor}
					className={`${styles.input} ${editorClassName}`}
					value={value}
					onChange={e => onChange && onChange(e.target.value)}
					cols={cols}
					rows={rows}
				/>
				<pre>{boilerplateBottom}</pre>
			</code>
		</div>
	)
}






export default CodeInput