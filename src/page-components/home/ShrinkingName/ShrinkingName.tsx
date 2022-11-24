import { useEffect, useRef } from "react"

import styles from "./ShrinkingName.module.scss"





const ShrinkingName: React.FC = () => {
	const fullname = useRef<HTMLHeadingElement>(null)

	useEffect(() => {
		const scrollHandle = () => {
			fullname.current?.style.setProperty("--scrollY", `${window.scrollY}`)
		}

		document.addEventListener("scroll", scrollHandle)
		return () => document.removeEventListener("scroll", scrollHandle)
	}, [])


	return (
		<h2 ref={fullname} className={styles.fullname}>
            E<span className={styles.shrink}>nver </span>
			<span id={styles.lastname}>
                S<span className={styles.shrink}>eçilmiş</span>
			</span>
		</h2>
	)
}





export default ShrinkingName