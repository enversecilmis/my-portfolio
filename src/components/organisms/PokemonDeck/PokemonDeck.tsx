import { useEffect, useState } from "react"
import PokemonCard from "@components/molecules/PokemonCard/PokemonCard"

import styles from "./PokemonDeck.module.scss"



export type DeckDragHandler = (id: number, dragAmount: [number, number]) => void
export type DeckDropHandler = (id: number, dragAmount: [number, number]) => void

type Props = {
	pokeIds: number[]
	onDrag?: DeckDragHandler
	onDrop?: DeckDropHandler
}

const PokemonDeck: React.FC<Props> = ({
	pokeIds,
	onDrag,
	onDrop,
}) => {
	const [expandSpace, setExpandSpace] = useState(0)

	useEffect(() => {
		setExpandSpace(70)
		const timeout = setTimeout(() => {
			setExpandSpace(0)
		}, 1000)

		return () => clearTimeout(timeout)
	}, [])
	return (
		<div className={styles.container}>
			<div className={styles.cards}>
				{pokeIds.map((pokeId, idx) => (
					<PokemonCard
						key={pokeId}
						className={styles.card}
						onDrag={(dragAmount) => onDrag && onDrag(pokeId, dragAmount)}
						onDrop={(dragAmount) => onDrop && onDrop(pokeId, dragAmount)}
						onDragStart={() => console.log("drag started")}
						style={{
							top: idx*5,
							left: idx*5 + expandSpace*idx,
							zIndex: idx,
						}}
						pokeId={pokeId}/>
				))}
			</div>
		</div>
	)
}






export default PokemonDeck