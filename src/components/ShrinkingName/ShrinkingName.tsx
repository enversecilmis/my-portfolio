import { useEffect, useState } from 'react'
import styles from './ShrinkingName.module.scss'





const ShrinkingName: React.FC<{  }> = ({  }) => {
    const [shrinkAmount, setShrinkAmount] = useState(1)
    


    useEffect(() => {
        const scrollHandle = () => setShrinkAmount(1 - (window.scrollY / 450))
        
        document.addEventListener("scroll", scrollHandle)
        return () => document.removeEventListener("scroll", scrollHandle)
    }, [])



    
    return (
        <h1 className={styles.fullname}>
            E<span style={{ opacity: shrinkAmount, fontSize: shrinkAmount*40 }}>nver </span>
            <span id={styles.lastname}>
            S<span style={{ opacity: shrinkAmount, fontSize: shrinkAmount*40 }}>eçilmiş</span>
            </span>
        </h1>
    )
}






export default ShrinkingName