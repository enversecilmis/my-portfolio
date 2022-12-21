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


export default isPrime