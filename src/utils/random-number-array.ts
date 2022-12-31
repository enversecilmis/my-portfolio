import { rndNum } from "./random-number"

const randomNumberArray = (
	amount: number,
	min = 1,
	max = 1000,
) => {
	const arr = []

	for (let i=0; i<amount; i++)
		arr.push(rndNum(min, max))

	return arr
}


export default randomNumberArray