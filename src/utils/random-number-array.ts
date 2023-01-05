import { rndNum } from "./random-number"

const randomNumberArray = (
	amount: number,
	min = 1,
	max = 1000,
	unique?: boolean,
) => {
	const arr: number[] = []

	if (unique && max-min > amount){
		for (let i=0; i<amount; i++) {
			const num = rndNum(min, max)

			if (arr.includes(num))
				i--
			else
				arr.push(num)
		}
	}
	else
		for (let i=0; i<amount; i++)
			arr.push(rndNum(min, max))

	return arr
}


export default randomNumberArray