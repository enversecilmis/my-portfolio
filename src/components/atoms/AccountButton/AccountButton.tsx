import { useEffect, useRef } from "react"
import popUpWindow, { ClosePopUpWindow } from "@utils/pop-up-window"
import { signOut, useSession } from "next-auth/react"

import styles from "./AccountButton.module.scss"



type Props = {
	className?: string
}


const AccountButton: React.FC<Props> = ({
	className,
}) => {
	const { data } = useSession()
	const closeWindow = useRef<ClosePopUpWindow | undefined>(undefined)

	const text = data ? data.user?.name : "Login"

	useEffect(() => {
		if (data && closeWindow.current)
			closeWindow.current()
	}, [data])


	const onClickHandler = () => {
		if (!data)
			closeWindow.current = popUpWindow("/sign-in", "Sign In")
		else
			signOut({ redirect: false })
	}

	return (
		<button
			onClick={onClickHandler}
			className={`${styles.container} ${className}`}>
			{text}
		</button>
	)
}






export default AccountButton