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
			signIn("github")
	}, [data, status])


	return null
}

export default SignInPage