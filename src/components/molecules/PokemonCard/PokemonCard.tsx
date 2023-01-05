import { HTMLAttributes, useRef } from "react"
import { useQuery } from "react-query"
import { animated, useSpring } from "@react-spring/web"
import { useDrag } from "@use-gesture/react"

import pokeFetch from "../../../projects-src/pokerank/utils/poke-fetch"

import styles from "./PokemonCard.module.scss"


type DivProps = Omit<HTMLAttributes<HTMLDivElement>, "onDrag"|"onDrop">

type Props = {
	pokeId: number
	onDrag?: (dragAmount: [number, number]) => void
	onDrop?: (draggedAmount: [number, number]) => void
	enableDrag?: boolean
} & DivProps


const PokemonCard: React.FC<Props> = ({
	pokeId,
	style: stylesProp,
	className,
	onDrag = () => { "" },
	onDrop = () => { "" },
	enableDrag,
	...restAttributes
}) => {
	const { data, isLoading } = useQuery({
		queryKey: `pokemon${pokeId}`,
		queryFn: () => pokeFetch(pokeId),
		staleTime: Infinity,
		cacheTime: Infinity,
	})

	const [springs, api] = useSpring(() => ({ x: 0, y: 0 }))
	const divRef = useRef<HTMLDivElement>(null)

	const bind = useDrag(({ down, movement }) => {
		const [x, y] = down ?
			movement:
			[0, 0]

		if (down)
			onDrag(movement)
		else
			onDrop(movement)

		api.start({ x, y, immediate: down })
	}, {
		preventDefault: false,
		bounds: divRef,
		rubberband: 0.18,
		enabled: enableDrag,
	})

	const imgSrc = isLoading? "/images/question-mark.png" : data?.image

	return (
		<animated.div
			className={`${styles.container} ${className}`}
			ref={divRef}
			style={{
				...stylesProp,
				...springs,
				touchAction: "none",
				width: "fit-content",
				height: "fit-content",
			}}
			{...bind()}
			{...restAttributes}
		>
			<div className={styles.imageContainer}>
				<img
					draggable={false}
					className={styles.image}
					src={imgSrc}
					alt="Pokemon Image" />
			</div>
			<span className={styles.name}>
				{data?.name || "loading..."}
			</span>
		</animated.div>
	)
}




export default PokemonCard