import styles from './InConstruction.module.scss'
import { BsInfoCircle } from "react-icons/bs";
import { useEffect, useState } from 'react';






const InConstruction: React.FC<{  }> = ({  }) => {

	const [isOpen, setIsOpen] = useState(false)

	useEffect(() =>{
		const timeout = setTimeout(() => {
			setIsOpen(true)
		}, 4000);

		return () => clearTimeout(timeout)
	}, [])


	return (
		<div  className={`${styles.container} ${isOpen? styles.open:""}`}>
			<BsInfoCircle className={styles.icon} />
			Hala yapım aşamasında
			<button className={styles.closeButton} onClick={() => setIsOpen(false)}></button>
		</div>
	)
}






export default InConstruction