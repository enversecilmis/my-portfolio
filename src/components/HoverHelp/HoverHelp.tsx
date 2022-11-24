import { BiHelpCircle } from "react-icons/bi"
import { autoPlacement, useFloating } from "@floating-ui/react-dom"

import styles from "./HoverHelp.module.scss"



type Props = {
    message: string
    calssName?: string
}

const HoverHelp: React.FC<Props> = ({
	message,
	calssName,
}) => {
	const { x, y, reference, floating, strategy } = useFloating({ middleware: [autoPlacement()]})


	return (
		<div className={`${styles.container} ${calssName}`}>
			<div
				ref={reference}
				className={styles.icon}
			>
				<BiHelpCircle/>
			</div>
			<p
				ref={floating}
				className={styles.message}
				style={{
					position: strategy,
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