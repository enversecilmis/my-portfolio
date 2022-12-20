// @ts-check
import { clientEnv, clientSchema } from "./schema.mjs"



/**
 * @param {import('zod').ZodFormattedError<Map<string,string>,string>} errors
 */
export const formatErrors = (errors) => {
	const formattedErrors = Object.entries(errors)
		.map(([name, value]) => {
			if (value && "_errors" in value)
				return `${name}: ${value._errors.join(", ")}\n`
		})
		.filter(Boolean)

	return formattedErrors
}



const _clientEnv = clientSchema.safeParse(clientEnv)

if (!_clientEnv.success) {
	console.error(
		"❌ Invalid environment variables:\n",
		...formatErrors(_clientEnv.error.format()),
	)
	throw new Error("Invalid environment variables")
}

/**
 * Validate that client-side environment variables are exposed to the client.
 */
for (let key of Object.keys(_clientEnv.data)) {
	if (!key.startsWith("NEXT_PUBLIC_")) {
		console.warn("❌ Invalid public environment variable name:", key)

		throw new Error("Invalid public environment variable name")
	}
}


export const env = _clientEnv.data
