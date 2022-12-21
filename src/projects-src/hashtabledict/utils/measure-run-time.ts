const measureRunTime = (func: (iteration: number) => void, iterations = 1) => {
	const dateBefore = Date.now()

	for (let i = 0; i < iterations; i++)
		func(i)
	const runTime = Date.now() - dateBefore

	return runTime
}


export default measureRunTime