import { useEffect, useRef, useState } from 'react'
import styles from './ShrinkingName.module.scss'





const ShrinkingName: React.FC<{  }> = ({  }) => {
    const fullname = useRef<HTMLHeadingElement>(null)
    
    useEffect(() => {
        const scrollHandle = () => {
            const shrinkAmount = Math.max(1-(window.scrollY / 450), 0)
            fullname.current?.style.setProperty('--shrinking-name-opacity', `${shrinkAmount}`)
            fullname.current?.style.setProperty('--shrinking-name-fontsize', `${shrinkAmount*30}px`)
        }
        
        document.addEventListener("scroll", scrollHandle)
        return () => document.removeEventListener("scroll", scrollHandle)
    }, [])


    return (
        <h2 className={styles.fullname} ref={fullname}>
            E<span className={styles.shrink}>nver </span>
            <span id={styles.lastname}>
                S<span className={styles.shrink}>eçilmiş</span>
            </span>
        </h2>
    )
}






export default ShrinkingName