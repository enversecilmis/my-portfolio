import NextAuth, { NextAuthOptions, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"




export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "email", type: "email", placeholder: "jsmith" },
				password: { label: "Password", type: "password" },
			},
			async authorize(cred, req) {
				if (!cred)
					return null

				const { email, password } = cred

				/**
				 * Validate credentials.
				 */

				const user: User = {
					id: "",
					email: "",
					image: "",
					name: "",
				}

				// return user
				return null
			},
		}),
	],
}



export default NextAuth(authOptions)