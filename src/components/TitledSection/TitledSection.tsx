import { ReactNode } from 'react'
import styles from './TitledSection.module.scss'





const TitledSection: React.FC<{
    contentClassName?: string,
    containerClassName?: string,
    title?: string,
    children?: ReactNode
}> = ({ contentClassName, title="", children, containerClassName }) => {


    return (
        <section  className={`${styles.container} ${containerClassName}`}>
            <h2 className={styles.title}>{title}</h2>
            <div className={`${styles.content} ${contentClassName}`}>
                {children}
            </div>
        </section>
    )
}






export default TitledSection