import { ReactNode } from "react"

import HeaderNav from "../organisms/HeaderNav/HeaderNav"
import Notifications from "../organisms/Notifications/Notifications"






const BasicLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<>
			<HeaderNav />
			{/* <ContactButton /> */}
			<Notifications />
			{children}
		</>
	)
}








export default BasicLayout