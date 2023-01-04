import { useEffect } from "react"
import { useNotification } from "@contexts/NotificationContext"
import { useTranslation } from "next-i18next"



// Why ?
// Because if I put the useNotification hook in _app.tsx
// it re-renders the whole app every time there is a notification.

const FirstNotification: React.FC = () => {
	const { pushNotification } = useNotification()
	const { t: commonT } = useTranslation("common")

	useEffect(() => {
		if (window.sessionStorage.getItem("landingNotificationShowed"))
			return

		pushNotification(commonT("cookieNotification"), {
			type: "info",
			source: "",
		})
		window.sessionStorage.setItem("landingNotificationShowed", "true")
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return <></>
}






export default FirstNotification