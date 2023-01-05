function bayesianAverage(ratings: number[], meanRating: number, totalVotes: number) {
	const totalRatings = ratings.length

	const avgRating = ratings.reduce((a, b) => a + b, 0) / totalRatings

	return ( (avgRating * totalRatings) + (meanRating * totalVotes) ) / (totalRatings + totalVotes)
}


export default bayesianAverage