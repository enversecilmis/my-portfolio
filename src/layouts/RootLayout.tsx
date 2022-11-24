import { ReactNode } from "react"

import HeaderNav from "../page-components/layout/HeaderNav/HeaderNav"
import Notifications from "../page-components/layout/Notifications.tsx/Notifications"






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