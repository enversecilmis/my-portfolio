import { useQuery } from "react-query"
import MaskedStars from "@components/atoms/MaskedStars/MaskedStars"
import PokemonCard from "@components/molecules/PokemonCard/PokemonCard"

import styles from "./PokeScoreSection.module.scss"



type PokeScore = {
	pokeId: number
    averageStar: number
    oneStarCount: number
    twoStarCount: number
    threeStarCount: number
    fourStarCount: number
    fiveStarCount: number
	voteCount: number
}

const starKeys = [
	"fiveStarCount",
	"fourStarCount",
	"threeStarCount",
	"twoStarCount",
	"oneStarCount",
] as const




const PokeScoreSection: React.FC = () => {
	const { data: scores, isLoading } = useQuery<PokeScore[]>({
		queryKey: "pokerankScores",
		queryFn: () => fetch("/api/pokerank/scores").then(res => res.json()),
		staleTime: Infinity,
		cacheTime: Infinity,
	})

	if (isLoading)
		return <span>Loading...</span>


	return (
		<div className={styles.container}>
			<div></div>
			{scores?.map((score, idx) => (
				<div
					key={score.pokeId}
					className={`${styles.scoreItem} ${styles[`item${idx}`]}`}
				>
					<div className={styles.cardDescription}>
						<PokemonCard className={styles.card} pokeId={score.pokeId}/>
						{/* {idx === 0 &&
						<p>lorem</p>
						} */}
					</div>
					<MaskedStars
						className={styles.stars}
						numberOfStars={5}
						percentage={score.averageStar*100 / 5} />

					<div className={styles.scoreDetails}>
						<div className={styles.starNumbers}>
							<span className={styles.number}>5</span>
							<span className={styles.number}>4</span>
							<span className={styles.number}>3</span>
							<span className={styles.number}>2</span>
							<span className={styles.number}>1</span>
						</div>
						<div className={styles.barsContainer}>
							{starKeys.map(starKey => (
								<div key={starKey} className={styles.bar}>
									<div
										style={{
											width: `${score[starKey]*100 / score.voteCount}%`,
										}}
										className={styles.starBar}>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			))}
			{scores?.length === 0 && <div>No data</div>}
		</div>
	)
}






export default PokeScoreSection