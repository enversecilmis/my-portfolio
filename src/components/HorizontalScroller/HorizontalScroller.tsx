import { useState } from 'react'
import styles from './HorizontalScroller.module.scss'
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import ResponsiveLayoutAnimation from '../ResponsiveLayoutAnimation/ResponsiveLayoutAnimation';
import Image from "next/legacy/image";





const HorizontalScroller: React.FC<{ className?: string }> = ({ className }) => {

    const [curItemIdx, setCurItemIdx] = useState(0)
    const lastIdx = 6


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
                        <p className={styles.description}>Responsive tasarımla arayüzün her türlü cihazda/ekranda düzgün görünmesi sağlanıyor.</p>
                        <ResponsiveLayoutAnimation className={styles.resLaySvg}/>
                    </div>
                </div>


                <div className={styles.renderStrats}>
                    <h4 className={styles.title}>Renderlama Stratejileri</h4>

                    <div className={styles.sections}>
                        <div className={styles.section}>
                            <div className={styles.description}>
                                <span className={styles.subTitle}>CSR</span>
                                <span className={styles.descText}>&quot;Client Side Rendering&quot; ile kullanıcı tarafında Javascript ile HTML oluşturulur.</span>
                            </div>
                            <div className={styles.imgContainer}>
                                <Image placeholder='blur' blurDataURL='/image.png' alt='client side rendering' src="/csr.png" layout='fill' objectFit='contain' className={styles.img}/>
                            </div>
                        </div>
                        <div className={styles.section}>
                            <div className={styles.description}>
                                <span className={styles.subTitle}>SSR</span>
                                <span className={styles.descText}>&quot;Server Side Rendering&quot; ile gelen isteğe göre oluşturulan sayfa kullanıcıya gönderilir.</span>
                            </div>
                            <div className={styles.imgContainer}>
                                <Image placeholder='blur' blurDataURL='/image.png' alt='server side rendering' src="/ssr.png" layout='fill' objectFit='contain' className={styles.img}/>
                            </div>
                        </div>
                        <div className={styles.section}>
                            <div className={styles.description}>
                                <span className={styles.subTitle}>SSG</span>
                                <span className={styles.descText}>&quot;Static Site Generation&quot; ile önceden oluşturulan sayfa istek geldiği anda kullanıcıya gönderilir.</span>
                            </div>
                            <div className={styles.imgContainer}>
                                <Image placeholder='blur' blurDataURL='/image.png' alt='static site generation' src="/ssg.png" layout='fill' objectFit='contain' className={styles.img}/>
                            </div>
                        </div>
                        <div className={styles.section}>
                            <div className={styles.description}>
                                <span className={styles.subTitle}>ISR</span>
                                <span className={styles.descText}>&quot;Incremental Static Regeneration&quot; ile önceden oluşturulan sayfa belli aralıklarla tekrar güncellenir.</span>
                            </div>
                            <div className={styles.imgContainer}>
                                <Image placeholder='blur' blurDataURL='/image.png' alt='incremental static regeneration' src="/isr.png" layout='fill' objectFit='contain' className={styles.img}/>
                            </div>
                        </div>
                    </div>
                </div>


                <div className={styles.axx}>
                    <h4 className={styles.title}>Başlık</h4>
                    <div className='w-full h-full flex'>
                        <div className='w-1/2 bg-amber-200'></div>
                        <div className='w-1/2 bg-amber-300'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}






export default HorizontalScroller