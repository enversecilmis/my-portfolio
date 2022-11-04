import { useTranslation } from 'next-i18next'
import Image from 'next/legacy/image'
import styles from './IntroSection.module.scss'





const IntroSection: React.FC = () => {
    const { t } = useTranslation('home')
    return (
        <section className={styles.container}>
            <div className={styles.ppContainer}>
                <Image src="/pp.jpg" alt='profile picture' layout={"fill"} objectFit={"contain"} className={styles.pp} />
            </div>
            <div className={styles.introText}>
                <p className={styles.title}>Hello World!</p>
                <p className={styles.text}>
                    {t('intro')}
                </p>
            </div>
        </section>
    )
}






export default IntroSection