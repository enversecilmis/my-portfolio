type NumberOnlyObject = {
	[key: string]: number
}

/**
 * Takes the average property values in an object array
 * and returns same type of object with the average values.
 */
const averageObject = <T extends NumberOnlyObject>(
	objectArray: Required<T>[],
	fractionDigits?: number,
) => {
	const averageObject = {} as T

	for (const key in objectArray[0]) {
		let total = 0
		for (const obj of objectArray)
			total += obj[key]

		averageObject[key] = fractionDigits !== undefined ?
			parseFloat((total / objectArray.length).toFixed(fractionDigits)) as T[Extract<keyof T, string>]:
			total / objectArray.length as T[Extract<keyof T, string>]
	}

	return averageObject
}



export default averageObject