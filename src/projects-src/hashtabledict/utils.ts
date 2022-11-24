import { z } from "zod"

import { HashStringFunction, OnCollisionNextIndexHandler } from "./types"





const isPrime = (x: number): boolean => {
	if (x === 2)
		return true
	if (x%2 === 0 || x < 2)
		return false

	const n = Math.sqrt(x)

	for (let i=3; i<=n; i+=2)
		if (x%i === 0)
			return false

	return true
}

/**
 *
 * @param number
 * @returns a prime number that's bigger or equal to `number`
 */
const findAPrimeBiggerThan = (number: number) => {
	let primeCandidate = number

	// eslint-disable-next-line no-constant-condition
	while (true) {
		if (isPrime(primeCandidate))
			return primeCandidate
		primeCandidate++
	}
}





const defaultHashStringFunction: HashStringFunction = (input) => {
	const g = 17
	let hash = 0

	for (let i=0; i<input.length; i++)
		hash += input.charCodeAt(i) * g**i

	return hash
}


// Quadratic probing.
const defaultCollisionHandler: OnCollisionNextIndexHandler = (currentHashValue, input, iteration) => currentHashValue*input.length + iteration ** 2


const zDictionaryArray = z
	.array(
		z.tuple([z.string(), z.string()]),
	).nonempty()


export {
	defaultCollisionHandler,
	defaultHashStringFunction,
	findAPrimeBiggerThan,
	isPrime,
	zDictionaryArray,
}