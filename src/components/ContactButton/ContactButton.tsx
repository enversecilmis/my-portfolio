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
        styles.modalGradient3,
        styles.modalGradient4,
        styles.modalGradient5,
    ]


    const closeModal = () => setIsOpen(false)
    const openModal = () => setIsOpen(true)


    const handleConnection = () => {
        if(isConnecting) return

        setIsConnecting(true)
        setTimeout(() => setIsConnecting(false), 3000)
    }





    return (
        <div className={styles.container}>
            <button
                aria-label="Contact Me"
                className={`${styles.button} ${isOpen? styles.buttonOpen:""}`}
                onClick={() => openModal()}
            >
                <IoIosCall size={25} className={`${styles.btnIcon}`} />
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
                <div className="flex justify-between items-center px-4 pt-2 w-full">
                    <p className="text-gray-100 font-normal text-lg">Slide Into My DMs</p>
                    <FiChevronDown onClick={() => closeModal()} size={30} className="text-gray-100 cursor-pointer"/>
                </div>

                <p className="text-gray-100 mt-20 px-4 text-lg font-light">You can join the public chat here</p>
                <div className="flex justify-center mt-5">
                    <button
                        className={`${styles.connectButtonBase} ${isConnecting? styles.connectButtonConnecting : styles.connectButton}`}
                        onClick={handleConnection}
                    >
                        {isConnecting? <MdWifi className="animate-pulse" size={30}/> : "Connect"}
                    </button>
                </div>

                <div className="flex items-center justify-around my-14 px-1 w-full opacity-50">
                    <div className="h-[.5px] w-full bg-gray-300"></div>
                    <p className="mx-2 text-gray-300 font-light">OR</p>
                    <div className="h-[.5px] w-full bg-gray-300"></div>
                </div>

                <div className="flex justify-center w-full">
                    <p className="text-gray-100 text-lg font-light">Message me on Whatsapp</p>
                </div>
                <div className="flex justify-center mt-5">
                    <a href="https://wa.me/905074403027" target="_blank" rel="noreferrer noopener" className="mt-2 text-gray-300 hover:text-[#25D366] duration-300">
                        <BsWhatsapp size={50}/>
                    </a>
                </div>
                
                <div className="absolute bottom-0 right-0 px-4 pb-2">
                    {gradients.map((g,idx) => 
                        <button
                            key={idx}
                            onClick={() => setGradClass(g)}
                            className={`${gradClass === g? g+" shadow-md scale-110" : g+" shadow-sm"} transition-all duration-300 w-6 h-6 rounded-full shadow-black mx-2`}
                        ></button>
                    )}
                </div>


            </Modal>
        </div>
    )
}






export default ContactButton