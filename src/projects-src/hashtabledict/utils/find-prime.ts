import isPrime from "./is-prime"

/**
 *
 * @param number
 * @returns a prime number that's bigger or equal to `number`
 */
const findPrimeBiggerThan = (number: number) => {
	let primeCandidate = number

	// eslint-disable-next-line no-constant-condition
	while (true) {
		if (isPrime(primeCandidate))
			return primeCandidate
		primeCandidate++
	}
}


export default findPrimeBiggerThan