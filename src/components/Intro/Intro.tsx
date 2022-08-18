import Image from 'next/image'
import styles from './Intro.module.scss'






const Intro: React.FC<{ className?: string | undefined }> = ({ className }) => {


    return (
        <section  className={`${styles.container} ${className}`}>
            <div className={styles.ppContainer}>
                <Image src="/pp.jpg" alt='profile picture' layout={"fill"} objectFit={"contain"} className={styles.pp} />
            </div>

            <div className={styles.introText}>
                <h4 className={styles.title}>Hello World!</h4>
                <p className={styles.text}>
                    Merhaba! Bu websitesini kendimi tanıtmak, kısaca bildiğim konseptleri göstermek ve yaptığım projeleri sergilemek için hazırladım.
                </p>
            </div>


            
        </section>
    )
}






export default Intro