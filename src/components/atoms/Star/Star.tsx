import { IconBaseProps } from "react-icons"
import { AiFillStar, AiOutlineStar } from "react-icons/ai"

// import styles from "./Star.module.scss"

type Props = {
	active: boolean
	activeClassName?: string
} & IconBaseProps


const Star: React.FC<Props> = ({
	active,
	activeClassName,
	className,
	...restProps
}) => {
	return active?
		<AiFillStar className={`${className} ${activeClassName}`} {...restProps} />:
		<AiOutlineStar className={className} {...restProps} />
}






export default Star