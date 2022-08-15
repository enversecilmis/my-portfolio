import { ReactNode } from "react"
import HeaderNav from "../components/HeaderNav/HeaderNav"






const BasicLayout: React.FC<{ children: ReactNode }> = ({ children }) => {


    return (
        <>
            <HeaderNav />
            <main>{children}</main>
        </>
    )
}






export default BasicLayout