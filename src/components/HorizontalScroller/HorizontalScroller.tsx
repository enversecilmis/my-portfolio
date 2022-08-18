import { useState } from 'react'
import styles from './HorizontalScroller.module.scss'
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import ResponsiveLayoutAnimation from '../ResponsiveLayoutAnimation/ResponsiveLayoutAnimation';
import Image from 'next/image';





const HorizontalScroller: React.FC<{ className?: string }> = ({ className }) => {

    const [curItemIdx, setCurItemIdx] = useState(0)
    const lastIdx = 5


    const nextSlide = () => {
        setCurItemIdx(p => {
            if(p+1 > lastIdx)
                return 0
            else
                return p+1
        })
    }
    const prevSlide = () => {
        setCurItemIdx(p => {
            if(p-1 < 0)
                return lastIdx
            else
                return p-1
        })
    }
    

    return (
        <div  className={`${styles.container} ${className}`}>
            <BsChevronCompactLeft className={styles.leftArrow} onClick={prevSlide}/>
            <BsChevronCompactRight className={styles.rightArrow} onClick={nextSlide}/>

            
            <div className={styles.slidingContainer} style={{ left: `-${curItemIdx*100}%` }}>



                <div className={`${styles.layoutAnimContainer}`}>
                    <h4 className={styles.title}>Responsive Layout</h4>
                    <div className={styles.content}>
                        <p className={styles.description}>Responsive tasarımla uygulama arayüzünün her türlü cihazda/ekranda düzgün görünmesi sağlanıyor.</p>
                        <ResponsiveLayoutAnimation className={styles.resLaySvg}/>
                    </div>
                </div>


                <div className={styles.renderStrats}>
                    <h4 className={styles.title}>Renderlama Stratejileri</h4>

                    <div className={styles.sections}>
                        <div className={styles.section}>
                            <div className={styles.description}>
                                <span className={styles.subTitle}>CSR</span>
                                <span className={styles.descText}>Client Side Rendering ile kullanıcı tarafında renderlama.</span>
                            </div>
                            <div className={styles.imgContainer}>
                                <Image src="/csr.png" layout='fill' objectFit='contain' className={styles.img}/>
                            </div>
                        </div>
                        <div className={styles.section}>
                            <div className={styles.description}>
                                <span className={styles.subTitle}>SSR</span>
                                <span className={styles.descText}>Server Side Rendering ile serverda renderlama.</span>
                            </div>
                            <div className={styles.imgContainer}>
                                <Image src="/ssr.png" layout='fill' objectFit='contain' className={styles.img}/>
                            </div>
                        </div>
                        <div className={styles.section}>
                            <div className={styles.description}>
                                <span className={styles.subTitle}>SSG</span>
                                <span className={styles.descText}>Static Site Generation ile önceden renderlama.</span>
                            </div>
                            <div className={styles.imgContainer}>
                                <Image src="/ssg.png" layout='fill' objectFit='contain' className={styles.img}/>
                            </div>
                        </div>
                        <div className={styles.section}>
                            <div className={styles.description}>
                                <span className={styles.subTitle}>ISR</span>
                                <span className={styles.descText}>Incremental Static Regeneration ile cache'li ssr.</span>
                            </div>
                            <div className={styles.imgContainer}>
                                <Image src="/isr.png" layout='fill' objectFit='contain' className={styles.img}/>
                            </div>
                        </div>
                    </div>
                </div>


                <div className={styles.axx}>
                    <h4 className={styles.title}>Erişebilirlik</h4>
                </div>
            </div>
        </div>
    )
}






export default HorizontalScroller