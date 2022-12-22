import { ReturnTypeError } from "../errors"
import { CollisionHandler } from "../types"


/**
 * @throws `ReturnTypeError`
 * @throws `EvalError`
 */
const evalCollisionHandler = (evalText: string) => {
	const collHandler = eval(evalText)

	const output = collHandler(19, "helo", 1)

	if (typeof output !== "number")
		throw new ReturnTypeError()

	return collHandler as CollisionHandler
}

export default evalCollisionHandler