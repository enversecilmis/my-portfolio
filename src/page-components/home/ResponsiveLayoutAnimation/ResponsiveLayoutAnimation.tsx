import { useEffect, useRef, useState } from 'react'
import styles from './ResponsiveLayoutAnimation.module.scss'





const ResponsiveLayoutAnimation: React.FC<{ className?: string }> = ({ className }) => {

    const mySvg = useRef<SVGSVGElement>(null)
    const [inView, setInView] = useState(false)



    
    useEffect(() => {
        let triggerOffset = 0

        if (mySvg.current) {
            const rect = mySvg.current?.getBoundingClientRect()
            triggerOffset = rect.y + rect.height
        }

        const onViewCheck = () => {
            const viewBottom = window.scrollY + window.innerHeight
            
            if (viewBottom > triggerOffset){
                setInView(true)
                document.removeEventListener("scroll", onViewCheck)
            }
        }
        document.addEventListener("scroll", onViewCheck)
        return () => { document.removeEventListener("scroll", onViewCheck) }
    }, [])





    return (
        <svg ref={mySvg} id={inView? styles.svgAnimate : ""} className={`${styles.svgBase} ${className}`} viewBox="0 0 300 169" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id={styles.screen}>
                <rect id={styles.frameRect} width="300" height="169" rx="8" fill="#D9D9D9" />
                <g id={styles.ui}>
                    <g id={styles.cornerbuttons}>
                        <circle id="buttonred" cx="8" cy="7" r="2.5" fill="#FF605C" />
                        <circle id="buttonyellow" cx="18" cy="7" r="2.5" fill="#FFBD44" />
                        <circle id="buttongreen" cx="28" cy="7" r="2.5" fill="#00CA4E" />
                    </g>
                    <g id={styles.menubutton}>
                        <rect id="Rectangle 6" x="273" y="21" width="9" height="1" rx={1} fill="#a8a9b5" />
                        <rect id="Rectangle 8" x="273" y="23" width="9" height="1" rx={1} fill="#a8a9b5" />
                        <rect id="Rectangle 7" x="273" y="25" width="9" height="1" rx={1} fill="#a8a9b5" />
                    </g>
                    <g id="header">
                        <circle id={styles.logo} cx="40" cy="23" r="8" fill="#a8a9b5" />
                        <g id={styles.links}>
                            <rect id="link4" x="245.313" y="19" width="37.6865" height="7.33945" rx="3.66972" fill="#a8a9b5" />
                            <rect id="link3" x="189.503" y="19" width="37.6865" height="7.33945" rx="3.66972" fill="#a8a9b5" />
                            <rect id="link2" x="131.692" y="19" width="37.6865" height="7.33945" rx="3.66972" fill="#a8a9b5" />
                            <rect id="link1" x="73.8807" y="19" width="37.6865" height="7.33945" rx="3.66972" fill="#a8a9b5" />
                        </g>
                    </g>
                    <g id={styles.articlesection}>
                        <rect id="title" x="10" y="45" width="280" height="7" rx="3.5" fill="#B7B7B7" />
                        <rect id="article" x="10" y="55" width="280" height="32" rx="5" fill="#B7B7B7" />
                    </g>
                    <g id={styles.boxes}>
                        <rect style={{"--boxorder": 0, transformOrigin: "25px 117px"} as React.CSSProperties} id={styles.box1} x="30" y="100" rx={5} width="30" height="30" fill="#b5aeb4" />
                        <rect style={{"--boxorder": 1, transformOrigin: "87.5px 117px"} as React.CSSProperties} id={styles.box2} x="82.5" y="100" rx={5} width="30" height="30" fill="#b5aeb4" />
                        <rect style={{"--boxorder": 2, transformOrigin: "150px 117px"} as React.CSSProperties} id={styles.box3} x="135" y="100" rx={5} width="30" height="30" fill="#b5aeb4" />
                        <rect style={{"--boxorder": 3, transformOrigin: "212.5px 117px"} as React.CSSProperties} id={styles.box4} x="187.5" y="100" rx={5} width="30" height="30" fill="#b5aeb4" />
                        <rect style={{"--boxorder": 4, transformOrigin: "275px 117px"} as React.CSSProperties} id={styles.box5} x="240" y="100" rx={5} width="30" height="30" fill="#b5aeb4" />
                    </g>
                </g>
            </g>
        </svg>
    )
}






export default ResponsiveLayoutAnimation