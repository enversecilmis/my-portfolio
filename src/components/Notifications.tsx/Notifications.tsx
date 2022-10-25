import styles from './Notifications.module.scss'
import { AnimatePresence, motion, usePresence, HTMLMotionProps } from "framer-motion"
import { useNotification } from '../../contexts/NotificationContext'
import { BiError, BiErrorCircle } from 'react-icons/bi'
import { BsInfoCircle } from 'react-icons/bs'
import { IoClose } from 'react-icons/io5'

// ***  TODO ***
//
// Proper auto scroll
//
// *************




const Notifications: React.FC<{  }> = ({  }) => {
    const { notifications, deleteNotification, pushNotification } = useNotification()
    const reversed = [...notifications].reverse()

    const TypeIcons = {
        error: BiError,
        warning: BiErrorCircle,
        info: BsInfoCircle
    }

    return (
        <ul className={styles.container}>
            <AnimatePresence mode='popLayout'>
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
                                    title="Delete Notification"
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





const ListItem: React.FC<HTMLMotionProps<"li">> = ({
    children,
    ...props
}) => {
    const [isPresent, safeToRemove] = usePresence()
    return (
        <motion.li
            style={{ position: isPresent? "relative":"absolute" }}
            layout={true}
            initial="out"
            animate={isPresent ? "in" : "deleted"}
            transition={{ type: "keyframes", duration: .3 }}
            variants={{
                in: { opacity: 1, left: 0, translateY: 0 },
                out: { opacity: 0, left: -100, translateY: 0 },
                deleted: { opacity: 0, left: 0, translateY: 0, zIndex: -1 }
            }}
            onAnimationComplete={() => { !isPresent && safeToRemove() }}
            {...props}
        >
            {children}
        </motion.li>
    )
}


export default Notifications