import { useState } from "react"
import Star from "@components/atoms/Star/Star"
import Trash from "@components/atoms/Trash/Trash"
import { useNotification } from "@contexts/NotificationContext"
import interpolate from "@utils/interpolate"
import { rndNum } from "@utils/random-number"
import randomNumberArray from "@utils/random-number-array"
import { useSession } from "next-auth/react"
import { useTranslation } from "next-i18next"

import PokemonDeck, { DeckDragHandler, DeckDropHandler } from "../PokemonDeck/PokemonDeck"

import styles from "./PokeRankSection.module.scss"


type Props = {
	className?: string
}


// TODO: Bulk insert the votes.

// TODO: Use tRPC

const MIN_ID = 1
const MAX_ID = 10

const PokeRankSection: React.FC<Props> = () => {
	const [pokeIds, setPokeIds] = useState(() => randomNumberArray(6, MIN_ID, MAX_ID, true))
	const [draggedPokemon, setDraggedPokemon] = useState<number>()
	const [rating, setRating] = useState<number>(0)
	const [trashing, setTrashing] = useState(false)
	const { data } = useSession()

	const { pushNotification } = useNotification()
	const { t: commonT } = useTranslation("common")



	const ratePokemon = () => {
		if (!data) {
			pushNotification(commonT("signInRequired"), {
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
		let newId = rndNum(MIN_ID, MAX_ID)

		while (pokeIds.includes(newId))
			newId = rndNum(MIN_ID, MAX_ID)

		setPokeIds(p => {
			const filtered = p.filter(val => val !== draggedPokemon)
			return [newId, ...filtered]
		})
	}

	const pokemonDragHandler: DeckDragHandler = (id, dragAmount) => {
		setDraggedPokemon(id)
		const inRatingArea = dragAmount[0] > 50
		const inTrashArea = dragAmount[0] < -50

		if (inRatingArea){
			const rvalue = interpolate(dragAmount[1], [150, -150], [1, 5])
			const rate = Math.min(5, Math.max(rvalue, 1))

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
						<Star className={styles.star} activeClassName={styles.filled} active={rating > 0}/>
						<Star className={styles.star} activeClassName={styles.filled} active={rating > 1}/>
						<Star className={styles.star} activeClassName={styles.filled} active={rating > 2}/>
						<Star className={styles.star} activeClassName={styles.filled} active={rating > 3}/>
						<Star className={styles.star} activeClassName={styles.filled} active={rating > 4}/>
					</>
				}
			</div>
		</div>
	)
}






export default PokeRankSection