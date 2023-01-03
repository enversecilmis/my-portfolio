import { useEffect } from "react"
import { signIn, useSession } from "next-auth/react"


// TODO: Look into this.
const SignInPage = () => {
	const { data, status } = useSession()

	useEffect(() => {
		if (status === "authenticated") {
			window.close()
		}

		if (!data)
			void signIn("github")
	}, [])


	return null
}

export default SignInPage