import styles from './Notifications.module.scss'
import { IoClose } from 'react-icons/io5'
import { useNotification } from '../../contexts/NotificationContext'
import { BsInfoCircle } from "react-icons/bs";
import { BiError, BiErrorCircle } from 'react-icons/bi';
import { useEffect, useRef } from 'react';



// ***  TODO ***
//
// Advanced auto scroll
//
// *************


const Notifications: React.FC<{  }> = ({  }) => {

    const lastItem = useRef<HTMLDivElement>(null)
    const { notifications, deleteNotification } = useNotification()

    const newestKey = useRef(0)

    useEffect(() => {

        
        lastItem.current?.scrollIntoView({behavior: "smooth"})
    }, [notifications])


    return (
        <div  className={styles.container}>
            <div className={styles.notificationsContainer}>
                {notifications.map(({key, message, type}) => (
                <div key={key} className={`${styles.notificationContainer} ${styles[type]}`}>
                    {type === "error"?
                        <BiError className={styles.typeIcon}/>:
                    type === "warning"?
                        <BiErrorCircle className={styles.typeIcon}/>:
                        <BsInfoCircle className={styles.typeIcon}/>
                    }
                    <p className={styles.notification}>{key} {message}</p>
                    <button
                        className={styles.closeButton}
                        title="Delete notification"
                        onClick={() => deleteNotification(key)}
                    >
                        <IoClose className={styles.closeIcon}/>
                    </button>
                </div>
                ))}
                <div ref={lastItem}></div>
                
            </div>
        </div>
    )
}






export default Notifications