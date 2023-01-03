import { useState } from "react"
import Star from "@components/atoms/Star/Star"
import Trash from "@components/atoms/Trash/Trash"
import { useNotification } from "@contexts/NotificationContext"
import interpolate from "@utils/interpolate"
import { rndNum } from "@utils/random-number"
import randomNumberArray from "@utils/random-number-array"
import { useSession } from "next-auth/react"

import PokemonDeck, { DeckDragHandler, DeckDropHandler } from "../PokemonDeck/PokemonDeck"

import styles from "./PokeRankSection.module.scss"


type Props = {
	className?: string
}


// TODO: Bulk insert the votes.

// TODO: Use tRPC


const PokeRankSection: React.FC<Props> = () => {
	const { data } = useSession()
	const { pushNotification } = useNotification()
	const [pokeIds, setPokeIds] = useState(() => randomNumberArray(6, 1, 700))
	const [draggedPokemon, setDraggedPokemon] = useState<number>()
	const [rating, setRating] = useState<number>(0)
	const [trashing, setTrashing] = useState(false)




	const ratePokemon = () => {
		if (!data) {
			pushNotification("You have to be signed to perform this action.", {
				type: "error",
				source: "Rate Pokemon",
				duration: 4000,
			})
			return
		}

		const voteData = {
			pokeId: draggedPokemon,
			vote: rating,
		}

		fetch("/api/pokerank/vote", {
			method: "POST",
			body: JSON.stringify(voteData),
		})

		// Remove rated pokemon
		removePokemon()
	}

	const removePokemon = () => {
		setPokeIds(p => {
			const filtered = p.filter(val => val !== draggedPokemon)
			return [rndNum(1, 700), ...filtered]
		})
	}

	const pokemonDragHandler: DeckDragHandler = (id, dragAmount) => {
		setDraggedPokemon(id)
		const inRatingArea = dragAmount[0] > 50
		const inTrashArea = dragAmount[0] < -50

		if (inRatingArea){
			const rate = interpolate(dragAmount[1], [150, -150], [1, 5])
			setRating(Math.round(rate))
			return
		}

		if (inTrashArea){
			setTrashing(true)
			return
		}

		setRating(0)
		setTrashing(false)
	}

	const pokemonDropHandler: DeckDropHandler = () => {
		if (trashing)
			removePokemon()
		if (rating > 0)
			ratePokemon()
		setDraggedPokemon(undefined)
		setRating(0)
		setTrashing(false)
	}



	return (
		<div className={styles.container}>
			<div className={styles.trashBinArea}>
				{draggedPokemon &&
				<Trash
					className={styles.trashBin}
					activeClassName={styles.trashActive}
					active={trashing}/>
				}
			</div>

			<PokemonDeck
				pokeIds={pokeIds}
				onDrag={pokemonDragHandler}
				onDrop={pokemonDropHandler}
			/>

			<div className={styles.ratingArea}>
				{draggedPokemon &&
					<>
						<Star className={styles.star} filledClassName={styles.filled} filled={rating > 0}/>
						<Star className={styles.star} filledClassName={styles.filled} filled={rating > 1}/>
						<Star className={styles.star} filledClassName={styles.filled} filled={rating > 2}/>
						<Star className={styles.star} filledClassName={styles.filled} filled={rating > 3}/>
						<Star className={styles.star} filledClassName={styles.filled} filled={rating > 4}/>
					</>
				}
			</div>
		</div>
	)
}






export default PokeRankSection