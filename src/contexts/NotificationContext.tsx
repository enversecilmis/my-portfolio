import { createContext, ReactNode, useCallback, useContext, useRef, useState } from "react"

// TODO: Put useNotification in hooks as well as useThemePref.

type NotificationType = "error" | "warning" | "info"
type Notification = { key: number, type: NotificationType, message: string, source?: string}
type PushNotificationOptions = {
    duration?: number
    type?: NotificationType
    source?: string
}
type PushNotificationFunc = (message: string, options?: PushNotificationOptions) => number
type DeleteNotificationFunc = (key: number) => void

type NotificationContextType = {
    notifications: Notification[]
    pushNotification: PushNotificationFunc
    deleteNotification: DeleteNotificationFunc
}




const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

const NotificationProvider: React.FC<{children?: ReactNode}> = ({ children }) => {
	const [notifications, setNotifications] = useState<Notification[]>([])
	const itemKey = useRef(0)


	const pushNotification = useCallback<PushNotificationFunc>((message, options) => {
		const key = itemKey.current
		const type = options?.type || "info"
		const source = options?.source

		setNotifications(p => [...p, { key, type, message, source }])

		if (options?.duration) {
			setTimeout(() => {
				setNotifications(p => p.filter(val => val.key !== key))
			}, options.duration)
		}
		itemKey.current += 1
		return key
	}, [])


	const deleteNotification = useCallback<DeleteNotificationFunc>(key => setNotifications(p => p.filter(val => val.key !== key)), [])


	return (
		<NotificationContext.Provider value={{ notifications, pushNotification, deleteNotification }}>
			{children}
		</NotificationContext.Provider>
	)
}

const useNotification = () => {
	const notificationCtx = useContext(NotificationContext)

	if (!notificationCtx)
		throw new Error("No notification provider found when calling useNotification")

	return notificationCtx
}


export {
	NotificationContext,
	NotificationProvider,
	useNotification,
}