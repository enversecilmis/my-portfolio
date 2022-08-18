import { ReactNode } from 'react'
import styles from './TitledSection.module.scss'





const TitledSection: React.FC<{
    className?: string,
    containerClassName?: string,
    title?: string,
    children?: ReactNode
}> = ({ className, title="", children }) => {


    return (
        <section  className={`${styles.container} ${className}`}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.content}>
                {children}
            </div>
        </section>
    )
}






export default TitledSection