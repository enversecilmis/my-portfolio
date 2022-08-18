import { ReactNode } from "react"
import ContactButton from "../components/ContactButton/ContactButton"
import Footer from "../components/Footer/Footer"
import HeaderNav from "../components/HeaderNav/HeaderNav"






const BasicLayout: React.FC<{ children: ReactNode }> = ({ children }) => {


    return (
        <>
            <HeaderNav />
            <ContactButton />
            {children}
            <Footer />
        </>
    )
}






export default BasicLayout