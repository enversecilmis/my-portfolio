import { ReactNode } from "react"
import ContactButton from "../components/ContactButton/ContactButton"
import Footer from "../components/Footer/Footer"
import HeaderNav from "../components/HeaderNav/HeaderNav"
import InConstruction from "../components/InConstruction/InConstruction"






const BasicLayout: React.FC<{ children: ReactNode }> = ({ children }) => {


    return (
        <>
            <HeaderNav />
            <ContactButton />
            <InConstruction/>
            {children}
            <Footer />
        </>
    )
}






export default BasicLayout