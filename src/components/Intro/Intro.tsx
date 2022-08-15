import styles from './Intro.module.scss'
import { CSSProperties, MouseEventHandler, useEffect, useRef, useState } from 'react'






const Intro: React.FC<{  }> = ({  }) => {
    const box = useRef<HTMLHeadingElement>(null)
    const origin = useRef({x: 0, y: 0})
    const interval = useRef<NodeJS.Timer>()





    useEffect(() => {
        return () => clearInterval(interval.current)
    }, [])





    const mouseMoveHandler:MouseEventHandler<HTMLDivElement> = (e) => {
        if(!box.current) return

        const boundingRect = box.current?.getBoundingClientRect()

        const centerX = boundingRect.left + boundingRect.width/2 + origin.current.x
        const centerY = boundingRect.top + boundingRect.height/2 + origin.current.y        
        
        box.current.style.setProperty('--rot-x', `${-(e.pageY - centerY)/25}deg`)
        box.current.style.setProperty('--rot-y', `${(e.pageX - centerX)/25}deg`)
    }



    const mouseLeaveHandler: MouseEventHandler<HTMLDivElement> = (e) => {
        if(!box.current) return

        const { left, top, width, height } = box.current?.getBoundingClientRect()

        const centerX = left + width/2 + origin.current.x
        const centerY = top + height/2 + origin.current.y 

        box.current.style.setProperty('--rot-x', `0deg`)
        box.current.style.setProperty('--rot-y', `0deg`)
        clearInterval(interval.current)
    }



    const mouseEnterHandler: MouseEventHandler<HTMLDivElement> = (e) => {
        if(!box.current) return
        const rect = box.current?.getBoundingClientRect()


        const centerX = rect.left + rect.width/2
        const centerY = rect.top + rect.height/2


        const distX = e.clientX - centerX
        const distY = e.clientY - centerY


        origin.current = {
            x: distX,
            y: distY
        }


        const duration = 150
        const iterations = duration / 17
        

        const perIterationX = distX / iterations
        const perIterationY = distY / iterations



        let i = 0
        interval.current = setInterval(() => {
            if(i > iterations){
                origin.current = { x:0, y:0 }
                clearInterval(interval.current)
            }

            origin.current.x -= perIterationX
            origin.current.y -= perIterationY
            i++
        }, 17)
        
        
        
        
        
    }






    return (
        <section className={styles.goalContainer}>
                <div
                    className={styles.goalRotateContainer}
                    onMouseMove={mouseMoveHandler}
                    onMouseLeave={mouseLeaveHandler}
                    onMouseEnter={mouseEnterHandler}
                    ref={box}
                >
                    <h2 id={styles.goal} className="lg:text-8xl md:text-7xl sm:text-6xl text-5xl text-">
                    On My Way <br />
                    to <br />
                    Fullstack
                    </h2>

                    <div className={styles.verticalLines}>
                        <div className={styles.verticalLine}></div>
                        <div className={styles.verticalLine}></div>
                        <div className={styles.verticalLine}></div>
                        <div className={styles.verticalLine}></div>
                    </div>
                    <div className={styles.horizontalLines}>
                        <div className={styles.horizontalLine}></div>
                        <div className={styles.horizontalLine}></div>
                        <div className={styles.horizontalLine}></div>
                    </div>
                </div>

        </section>
    )
}






export default Intro