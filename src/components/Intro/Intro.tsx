import styles from './Intro.module.scss'
import { CSSProperties, MouseEventHandler, useRef, useState } from 'react'






const Intro: React.FC<{  }> = ({  }) => {
    const box = useRef<HTMLHeadingElement>(null)
    const [rotX, setRotX] = useState(0)
    const [rotY, setRotY] = useState(0)


    

    const mouseMoveHandler:MouseEventHandler<HTMLDivElement> = (e) => {
        if(!box.current) return

        const boundingRect = box.current?.getBoundingClientRect()
        const boxCenter = {
            x: boundingRect.left + boundingRect.width/2, 
            y: boundingRect.top + boundingRect.height/2
        }
        
        setRotX((-(e.pageY - boxCenter.y))/30)
        setRotY((e.pageX - boxCenter.x)/30)
    }

    const mouseLeaveHandler = () => {
        setRotX(0)
        setRotY(0)
    }




    return (
        <section className={styles.goalContainer}>
                <div
                    className={styles.goalRotateContainer}
                    style={{"--rot-x": `${rotX}deg`, "--rot-y": `${rotY}deg`} as CSSProperties}
                    onMouseMove={mouseMoveHandler}
                    onMouseLeave={mouseLeaveHandler}
                >
                    <h2 ref={box} id={styles.goal} className="lg:text-8xl md:text-7xl sm:text-6xl text-5xl text-">
                    On My Way <br />
                    to <br />
                    Fullstack
                    </h2>

                    <div className={styles.verticalLines} >
                        <div className={styles.verticalLine}></div>
                        <div className={styles.verticalLine}></div>
                        <div className={styles.verticalLine}></div>
                        <div className={styles.verticalLine}></div>
                    </div>
                    <div className={styles.horizontalLines} >
                        <div className={styles.horizontalLine}></div>
                        <div className={styles.horizontalLine}></div>
                        <div className={styles.horizontalLine}></div>
                    </div>
                </div>
        </section>
    )
}






export default Intro