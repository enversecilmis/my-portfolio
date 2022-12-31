import { IconBaseProps } from "react-icons"
import { AiFillStar, AiOutlineStar } from "react-icons/ai"

// import styles from "./Star.module.scss"

type Props = {
	filled: boolean
	filledClassName?: string
} & IconBaseProps


const Star: React.FC<Props> = ({
	filled,
	filledClassName,
	className,
	...restProps
}) => {
	return filled?
		<AiFillStar className={`${className} ${filledClassName}`} {...restProps} />:
		<AiOutlineStar className={className} {...restProps} />
}






export default Star