import styles from './Notifications.module.scss'
import { IoClose } from 'react-icons/io5'
import { useNotification } from '../../contexts/NotificationContext'
import { BsInfoCircle } from "react-icons/bs";
import { BiError, BiErrorCircle } from 'react-icons/bi';
import { useEffect, useRef } from 'react';
import { useTransition, animated, easings } from '@react-spring/web';

// ***  TODO ***
//
// Proper auto scroll
//
// *************




const Notifications: React.FC<{  }> = ({  }) => {

    const lastItem = useRef<HTMLDivElement>(null)
    const { notifications, deleteNotification } = useNotification()

    const transitions = useTransition(notifications, {
        from: {
            opacity: 0,
            left: "-300px",
        },
        enter: {
            opacity: 1,
            left: "0px",
        },
        leave: {
            opacity: 0,
            left: "-300px",
        },
        delay: 0,
        config: {
            duration: 500,
            easing: easings.easeOutExpo
        }
    })
 

    useEffect(() => {        
        lastItem.current?.scrollIntoView({behavior: "smooth"})
    }, [notifications])


    return (
        <div  className={styles.container}>
            <ul className={styles.notificationsContainer}>
                {transitions((style,item) => (
                <animated.li
                    key={item.key}
                    className={`${styles.notificationContainer} ${styles[item.type]}`}
                    style={{
                        opacity: style.opacity,
                        left: style.left
                    }}
                >
                    {item.type === "error"?
                        <BiError className={styles.typeIcon}/>:
                    item.type === "warning"?
                        <BiErrorCircle className={styles.typeIcon}/>:
                        <BsInfoCircle className={styles.typeIcon}/>
                    }
                    <p className={styles.notification}>{item.message}</p>
                    <button
                        className={styles.closeButton}
                        title="Delete notification"
                        onClick={() => deleteNotification(item.key)}
                    >
                        <IoClose className={styles.closeIcon}/>
                    </button>
                </animated.li>
                ))}
                {/* {transitions((style,item) => (
                    <animated.li
                        key={item.key}
                        style={{
                            opacity: style.opacity,
                        }}
                    >
                        {item.message}
                    </animated.li>
                ))} */}
                <div ref={lastItem}></div>
                
            </ul>
        </div>
    )
}






export default Notifications