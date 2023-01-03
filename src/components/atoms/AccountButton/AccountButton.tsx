import { useEffect, useRef } from "react"
import { useNotification } from "@contexts/NotificationContext"
import noPP from "@public/images/no-pp.webp"
import popUpWindow, { ClosePopUpWindow } from "@utils/pop-up-window"
import Image from "next/image"
import { signOut, useSession } from "next-auth/react"
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
	const { data } = useSession()

	const closeWindow = useRef<ClosePopUpWindow | undefined>(undefined)


	useEffect(() => {
		if (data && closeWindow.current) {
			closeWindow.current()
			pushNotification(`${commonT("welcome")} ${data.user?.name}!`, {
				duration: 4000,
			})
		}
		if (!data){
			pushNotification(commonT("logoutSuccess"), {
				duration: 4000,
			})
		}
	}, [data])


	const onClickHandler = () => {
		if (!data)
			closeWindow.current = popUpWindow("/sign-in", "Sign In")
		else
			signOut({ redirect: false })
	}


	const buttonContent = data ?
		<Image src={data.user?.image || noPP} width={25} height={25} style={{ borderRadius: 50 }} alt="profile image" /> :
		"Login"

	return (
		<button
			onClick={onClickHandler}
			className={`${styles.container} ${className}`}>
			{buttonContent}
		</button>
	)
}






export default AccountButton