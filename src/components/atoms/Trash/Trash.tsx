import { IconBaseProps } from "react-icons"
import { FaTrashAlt } from "react-icons/fa"

import styles from "./Trash.module.scss"


type Props = {
	active?: boolean
	activeClassName?: string
} & IconBaseProps


const Trash: React.FC<Props> = ({
	active,
	className,
	activeClassName,
	...restProps
}) => {
	const cName = `${className} ${active? activeClassName:""}`

	return (
		<FaTrashAlt className={cName} {...restProps}/>
	)
}






export default Trash