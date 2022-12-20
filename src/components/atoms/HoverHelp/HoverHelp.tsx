import { BiHelpCircle } from "react-icons/bi"
import { autoPlacement, autoUpdate, shift, useFloating } from "@floating-ui/react-dom"

import styles from "./HoverHelp.module.scss"



type Props = {
    message: string
    className?: string
}

const HoverHelp: React.FC<Props> = ({
	message,
	className,
}) => {
	const { x, y, reference, floating, update } = useFloating({
		middleware: [autoPlacement(), shift()],
	})


	return (
		<div
			className={styles.container}
			onMouseEnter={update}
		>
			<div
				ref={reference}
				className={styles.icon}
			>
				<BiHelpCircle/>
			</div>
			<p
				ref={floating}
				className={`${styles.message} ${className}`}
				style={{
					top: y ?? 0,
					left: x ?? 0,
				}}
			>
				{message}
			</p>

		</div>
	)
}






export default HoverHelp