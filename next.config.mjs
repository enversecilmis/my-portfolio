import func from "@next/bundle-analyzer"

import { env } from "./src/env/server.mjs"



/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
const withBundleAnalyzer = func({
	enabled: env.ANALYZE === "true",
})

function defineNextConfig(config) {
	return withBundleAnalyzer(config)
}


export default defineNextConfig({
	reactStrictMode: true,
	swcMinify: true,

	i18n: {
		locales: ["en", "tr"],
		defaultLocale: "tr",
	},

	images: {
		domains: ["https://avatars.githubusercontent.com", "avatars.githubusercontent.com"],
	},
})
