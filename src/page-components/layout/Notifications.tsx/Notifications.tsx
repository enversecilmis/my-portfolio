import { forwardRef, Ref } from "react"
import { BiError, BiErrorCircle } from "react-icons/bi"
import { BsInfoCircle } from "react-icons/bs"
import { IoClose } from "react-icons/io5"
import { AnimatePresence, HTMLMotionProps, motion, usePresence } from "framer-motion"
import { useTranslation } from "next-i18next"

import { useNotification } from "../../../contexts/NotificationContext"

import styles from "./Notifications.module.scss"

// ***  TODO ***
//
// Proper auto scroll
//
// *************


const TypeIcons = {
	error: BiError,
	warning: BiErrorCircle,
	info: BsInfoCircle,
}

const Notifications: React.FC = () => {
	const { notifications, deleteNotification } = useNotification()
	const reversed = [...notifications].reverse()
	const { t } = useTranslation("common")



	return (
		<ul className={styles.container}>
			<AnimatePresence mode="popLayout">
				{reversed.map(notif => {
					const TypeIcon = TypeIcons[notif.type]

					return (
						<ListItem
							key={notif.key}
							className={`${styles.notificationItem} ${styles[notif.type]}`}
						>
							<div className={styles.top}>
								<TypeIcon className={styles.typeIcon} />
								<span className={styles.source}>{notif.source}</span>
								<button
									className={styles.closeButton}
									title={t("deleteNotification")}
									onClick={() => deleteNotification(notif.key)}
								>
									<IoClose/>
								</button>

							</div>
							<div className={styles.bottom}>
								{notif.message}
							</div>

						</ListItem>
					)
				})}
			</AnimatePresence>
		</ul>
	)
}






const ListItem: React.FC<HTMLMotionProps<"li">> = forwardRef(({
	children,
	...props
}, ref:Ref<HTMLLIElement> | undefined) => {
	const [isPresent, safeToRemove] = usePresence()

	return (
		<motion.li
			ref={ref}
			style={{ position: isPresent? "relative":"absolute" }}
			layout={true}
			initial="out"
			animate={isPresent ? "in" : "deleted"}
			transition={{ type: "keyframes", duration: .3 }}
			variants={{
				in: { opacity: 1, left: 0, translateY: 0 },
				out: { opacity: 0, left: -100, translateY: 0 },
				deleted: { opacity: 0, left: 0, translateY: 0, zIndex: -1 },
			}}
			onAnimationComplete={() => { !isPresent && safeToRemove() }}
			{...props}
		>
			{children}
		</motion.li>
	)
})

ListItem.displayName = "ListItem"

export default Notifications