import { useEffect, useState } from "react";
import { GrChat } from "react-icons/gr";
import { BsWhatsapp } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import { IoIosCall } from "react-icons/io";
import { MdWifi } from "react-icons/md";
import Modal from 'react-modal';
import styles from "./ContactButton.module.scss";









const ContactButton: React.FC<{  }> = ({  }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isConnecting, setIsConnecting] = useState(false)
    const [fadeClass, setFadeClass] = useState<string | undefined>("")
    const [gradClass, setGradClass] = useState(styles.modalGradient1)


    
    useEffect(() => {
        setFadeClass( isOpen? styles.fadeIn : styles.fadeOut )
    }, [isOpen])


    const gradients = [
        styles.modalGradient1,
        styles.modalGradient2,
    ]



    const closeModal = () => setIsOpen(false)
    const openModal = () => setIsOpen(true)
    const handleConnection = () => {
        if(isConnecting) return

        setIsConnecting(true)
        setTimeout(() => setIsConnecting(false), 3000)
    }





    return (
        <>
            <button
                aria-label="Contact Me"
                className={`${styles.button} ${isOpen && styles.open}`}
                onClick={() => openModal()}
            >
                <IoIosCall size={25} className={`${styles.btnIcon}`}/>
            </button>



            <Modal
                ariaHideApp={false}
                isOpen={isOpen}
                onRequestClose={closeModal}
                className={`${styles.messageModal} ${fadeClass} ${gradClass}`}
                overlayClassName={`${styles.messageModalOverlay}`}
                contentLabel="Message Box"
                closeTimeoutMS={300}
            >   
                <div className="absolute bottom-0 right-0 px-4 pb-2">
                    {gradients.map((g,idx) => 
                        <button
                            key={idx}
                            onClick={() => setGradClass(g)}
                            className={`${gradClass === g? g+" shadow-md scale-110" : g+" shadow-sm"} transition-all duration-300 w-6 h-6 rounded-full shadow-black mx-2`}
                        ></button>
                    )}
                    <button
                        onClick={() => setGradClass(styles.themeGradient)}
                        className={`${styles.themeGradButton} ${gradClass === styles.themeGradient? "shadow-md scale-110 rotate-45" : "shadow-sm -rotate-45"} transition-all duration-300 w-6 h-6 rounded-full shadow-black mx-2`}
                    ></button>
                </div>

                
            </Modal>
        </>
    )
}






export default ContactButton