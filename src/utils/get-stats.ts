export type Stats = {
    max: number
    min: number
    total: number
    average: number
    standardDeviation: number
    histogram: number[]
}
export const getStats = (arr: number[], fractionDigits?: number): Stats => {
	const max = Math.max(...arr)
	const min = Math.min(...arr)
	const total = arr.reduce((acc, cur) => acc+cur)
	const average = total / arr.length
	const standardDeviation = (arr.reduce((prev, current) => prev + (current-average)**2)) / arr.length
	const histogram = new Array(max+1).fill(0)

	arr.forEach(val => histogram[val] += 1)



	if (fractionDigits !== undefined && fractionDigits >= 0)
		return {
			max: parseFloat(max.toFixed(fractionDigits)),
			min: parseFloat(min.toFixed(fractionDigits)),
			total: parseFloat(total.toFixed(fractionDigits)),
			average: parseFloat(average.toFixed(fractionDigits)),
			standardDeviation: parseFloat(standardDeviation.toFixed(fractionDigits)),
			histogram,
		}
	return {
		max,
		min,
		total,
		average,
		standardDeviation,
		histogram,
	}
}