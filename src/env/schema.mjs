// @ts-check
import { z } from "zod"



// server-side environment variables schema.
export const serverSchema = z.object({
	ANALYZE: z.union([
		z.literal("true"),
		z.literal("false"),
	]),
	NEXTAUTH_URL: z.string(),
})


/**
 * client-side environment variables schema.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
export const clientSchema = z.object({
	NEXT_PUBLIC_BAR: z.string(),
})

/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */
export const clientEnv = {
	NEXT_PUBLIC_BAR: "helo",
}
