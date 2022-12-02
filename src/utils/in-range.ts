/**
 * @param num a number
 * @param min inclusive
 * @param max exclusive
 */
export const inRange = (num: number, min: number, max: number) => {
	if (num < min)
		return max - 1
	else
		return num % max
}
