import { z } from "zod"

const zDictionaryArray = z
	.array(
		z.tuple([z.string(), z.string()]),
	).nonempty()

export default zDictionaryArray