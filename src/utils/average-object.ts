type NumberOnlyObject = {
	[key: string]: number
}


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