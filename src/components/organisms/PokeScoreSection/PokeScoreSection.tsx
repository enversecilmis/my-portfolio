import { useQuery } from "react-query"

import styles from "./PokeScoreSection.module.scss"



type PokeScore = {
	pokeId: number
    averageStar: number
    oneStarCount: number
    twoStarCount: number
    threeStarCount: number
    fourStarCount: number
    fiveStarCount: number
}


const PokeScoreSection: React.FC = () => {
	const { data, isLoading } = useQuery<PokeScore[]>({
		queryFn: () => fetch("/api/pokerank/scores").then(res => res.json()),
		queryKey: "pokerankScores",
	})


	if (isLoading)
		return <span>Loading...</span>

	console.log(data)

	return (
		<div className={styles.container}>
			{data?.map(score => (
				<div key={score.pokeId}>
					<div>{score.pokeId}</div>
					<div>{score.averageStar}</div>
					<div>{score.fiveStarCount}</div>
					<div>{score.fourStarCount}</div>
					<div>{score.threeStarCount}</div>
					<div>{score.twoStarCount}</div>
					<div>{score.oneStarCount}</div>
				</div>
			))}
			{data?.length === 0 && <div>No data</div>}
		</div>
	)
}






export default PokeScoreSection