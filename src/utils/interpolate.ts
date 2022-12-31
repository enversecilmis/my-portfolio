const interpolate = (
	x: number,
	[a, b]: [number, number],
	[c, d]: [number, number],
) => (x-a)*(d-c) / (b - a) + c


export default interpolate