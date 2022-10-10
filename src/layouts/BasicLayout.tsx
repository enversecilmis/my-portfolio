import { ReactNode } from "react"
import ContactButton from "../components/ContactButton/ContactButton"
import HeaderNav from "../components/HeaderNav/HeaderNav"
import Notifications from "../components/Notifications.tsx/Notifications"






const BasicLayout: React.FC<{ children: ReactNode }> = ({ children }) => {


    return (
        <>
            <HeaderNav />
            <ContactButton />
            <Notifications />
            {children}
        </>
    )
}








export default BasicLayout