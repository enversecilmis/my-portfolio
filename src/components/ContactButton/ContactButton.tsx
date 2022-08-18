import { MouseEventHandler, useEffect, useState } from "react";
import { BsWhatsapp } from "react-icons/bs";
import { FaHourglassEnd } from "react-icons/fa";
import { IoIosCall, IoMdSend } from "react-icons/io";
import Modal from 'react-modal';
import styles from "./ContactButton.module.scss";









const ContactButton: React.FC<{  }> = ({  }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [fadeClass, setFadeClass] = useState<string | undefined>("")
    const [gradClass, setGradClass] = useState(styles.themeGradient)
    const [isSending, setIsSending] = useState(false)


    
    useEffect(() => {
        setFadeClass( isOpen? styles.fadeIn : styles.fadeOut )
    }, [isOpen])


    const gradients = [
        styles.modalGradient1,
        styles.modalGradient2,
    ]



    const closeModal = () => setIsOpen(false)
    const openModal = () => setIsOpen(true)


    const submitFeedBack: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault()
        setIsSending(true)

        setTimeout(() => setIsSending(false), 2000)
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
                <p className={styles.title}>İletişime Geçin</p>
                <form className="w-full px-10">
                    <input className={styles.input} spellCheck={false} type="text" placeholder="İsim" />
                    <input className={styles.input} spellCheck={false} type="email" placeholder="Email" />
                    <textarea className={styles.input} placeholder="Mesaj..." cols={30} rows={2}></textarea>
                    <button disabled={isSending} className={styles.sendButton} onClick={submitFeedBack} type="submit" style={isSending? { backgroundColor : "#2b912b"}: {}}>
                        {isSending? <FaHourglassEnd /> : <IoMdSend />}
                    </button>
                </form>

                <div className={styles.orLine}>
                    <div></div>
                    <p>veya</p>
                    <div></div>
                </div>
                
                <div className="flex flex-col items-center mt-10">
                    <button
                        className="mb-5"
                        onClick={() => window.open('mailto:enversecilmis1@gmail.com')}>
                            enversecilmis1@gmail.com
                        </button>
                    <a className="mb-5" href="tel://+905074403027">+90 507 440 3027</a>
                    <a href="https://wa.me/905074403027" target="_blank" rel="noreferrer noopener" className={styles.wplink}>
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