import { useRef } from "react"
import { useGesture } from "@use-gesture/react"
import { animated, config, useSpring } from "@react-spring/web"
import styles from './Goal.module.scss'






const Goal: React.FC<{  }> = ({  }) => {
    const hoverContainer = useRef<HTMLDivElement>(null)

    const [{ rotateX, rotateY }, api] = useSpring(() => ({
        rotateX: 0,
        rotateY: 0,
        config: config.stiff,
    }))


    useGesture({
        onMove: ({ xy: [px,py], }) => {
            const {left, width, height, top} = hoverContainer.current?.getBoundingClientRect() as DOMRect
            const centerX = left + width/2
            const centerY = top + height/2
            api({
                rotateX: -(py - centerY)/25,
                rotateY: (px - centerX)/25,
            })
        },
        onHover: ({ hovering }) => {
            !hovering &&
            api({
                rotateX: 0,
                rotateY: 0,
            })
        }
    }, {target: hoverContainer})



    return (
        <div className={styles.container}>
            <div className={styles.hoverContainer} ref={hoverContainer}>
                <animated.div
                    className={styles.rotationContainer}
                    style={{
                        transform: "perspective(500px)",
                        rotateX,
                        rotateY,
                    }}
                >
                    <div className={styles.text}>
                        <p>On My Way</p>
                        <p>to</p>
                        <p>Fullstack</p>
                    </div>
                    <div className={styles.vLines}>
                        <div className="w-px h-full"></div>
                        <div className="w-px h-full"></div>
                        <div className="w-px h-full"></div>
                        <div className="w-px h-full"></div>
                    </div>
                    <div className={styles.hLines}>
                        <div className="h-px w-full"></div>
                        <div className="h-px w-full"></div>
                        <div className="h-px w-full"></div>
                    </div>

                </animated.div>
            </div>
        </div>
    )
}






export default Goal