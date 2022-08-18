import styles from './HorizontalSlider.module.scss'
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import React, { ReactNode } from 'react';






const HorizontalSlider: React.FC<{
    className?: string,
    children?: ReactNode,
    showArrows?: boolean
}> = ({ className, children, showArrows=true }) => {





    return (
        <div className={`${styles.container} ${className}`}>
            {showArrows && <>
                <BsChevronCompactLeft className={styles.leftArrow}/>
                <BsChevronCompactRight className={styles.rightArrow}/>
            </>}
            
            <div className={styles.innerContainer}>

                {React.Children.map(children, (child, idx) => (
                <div key={idx} className={styles.itemContainer}>
                    {child}
                </div>
                ))}
                
            </div>
        </div>
    )
}






export default HorizontalSlider