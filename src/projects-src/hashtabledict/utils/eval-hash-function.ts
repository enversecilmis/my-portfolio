import { ReturnTypeError } from "../errors"
import { HashStringFunction } from "../types"



/**
 * @throws `ReturnTypeError`
 */
const evalHashFunction = (evalText: string) => {
	const hFunc = eval(evalText)
	const output = hFunc("helo")

	if (typeof output !== "number")
		throw new ReturnTypeError()

	return hFunc as HashStringFunction
}



export default evalHashFunction