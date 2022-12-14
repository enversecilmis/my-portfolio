type ConstructorOf<T> = (new () => T)

type ErrMsgPair<T extends Error> = [ConstructorOf<T>, string | ((error: T) => string)]

type ErrMsgPairDefault<T extends Error> = ErrMsgPair<T> | ["default", string]


/**
 * Declarative way to determine error message based on the error instance.
 */
const getErrorMessage = <T extends Error>(
	err: unknown,
	errMessages: ErrMsgPairDefault<T>[],
) => {
	const defaultMessage = errMessages.find(([e]) => e === "default")?.[1] as string
	const filteredPairs = errMessages.filter(([e]) => e !== "default") as ErrMsgPair<T>[]

	for (const [ErrConstructor, msg] of filteredPairs) {
		if (err instanceof ErrConstructor) {
			return msg instanceof Function ?
				msg(err):
				msg
		}
	}


	if (err instanceof Error)
		return err.toString()
	else
		return defaultMessage || "Error"
}


export default getErrorMessage