import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"

import { env } from "../../../env/server.mjs"




export const authOptions: NextAuthOptions = {
	secret: env.NEXTAUTH_SECRET,
	providers: [
		GithubProvider({
			clientId: env.GITHUB_ID,
			clientSecret: env.GITHUB_SECRET,
		}),
	],
	jwt: {
		maxAge: 60 * 60 * 24,
	},
}



export default NextAuth(authOptions)