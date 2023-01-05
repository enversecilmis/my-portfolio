import { useEffect, useRef } from "react"
import { isMobile } from "react-device-detect"
import { IoMdClose } from "react-icons/io"
import { useNotification } from "@contexts/NotificationContext"
import noPP from "@public/images/no-pp.webp"
import popUpWindow, { ClosePopUpWindow } from "@utils/pop-up-window"
import Image from "next/image"
import { signIn, signOut, useSession } from "next-auth/react"
import { useTranslation } from "next-i18next"

import styles from "./AccountButton.module.scss"



type Props = {
	className?: string
}


const AccountButton: React.FC<Props> = ({
	className,
}) => {
	const { t: commonT } = useTranslation("common")
	const { pushNotification } = useNotification()
	const { data: session, status } = useSession()

	const closeWindow = useRef<ClosePopUpWindow | undefined>(undefined)



	useEffect(() => {
		if (status === "authenticated" && closeWindow.current) {
			closeWindow.current()
			pushNotification(`${commonT("welcome")} ${session.user?.name}!`, {
				duration: 4000,
			})
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [session, status])


	const signInHandler = () => {
		if (isMobile)
			signIn("github")
		else
			closeWindow.current = popUpWindow("/sign-in", "Sign In")
	}
	const accountButtonHandler = () => {
		if (status === "unauthenticated")
			signInHandler()
		else {
			signOut({ redirect: false })
			pushNotification(commonT("logoutSuccess"), {
				duration: 4000,
			})
		}
	}


	const buttonContent = session ?
		<Image src={session.user?.image || noPP} width={25} height={25} style={{ borderRadius: 50 }} alt="profile image" /> :
		commonT("signIn")

	return (
		<>
			<button
				title={session ? commonT("signOut") : commonT("signIn")}
				onClick={accountButtonHandler}
				className={`${styles.container} ${className}`}>
				{buttonContent}
				{session && <IoMdClose className={styles.closeIcon}/>}
			</button>
		</>
	)
}






export default AccountButton