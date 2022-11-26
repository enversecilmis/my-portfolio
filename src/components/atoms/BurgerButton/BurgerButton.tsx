import styles from "./BurgerButton.module.scss"


type SetStateAction<S> = S | ((prevState: S) => S)
type setStateFunc = ( value: SetStateAction<boolean> ) => void



const BurgerButton: React.FC<{
    isOpen: boolean,
    setIsOpen: setStateFunc,
    className?: string | undefined
}> = ({ isOpen, setIsOpen, className }) => {
	return (
		<button className={`${className}`} name="open navigation menu" onClick={() => setIsOpen(p => !p)}>
			<div className={`${styles.mobileMenuButton} ${isOpen && styles.open}`}></div>
		</button>
	)
}






export default BurgerButton