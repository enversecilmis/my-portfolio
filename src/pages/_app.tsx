import { ReactElement, useEffect } from "react"
import { useNotification } from "@contexts/NotificationContext"
import { NextPage } from "next"
import { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"
import { appWithTranslation, useTranslation } from "next-i18next"

import { NotificationProvider } from "../contexts/NotificationContext"
import ThemePrefProvider from "../contexts/ThemeContext"

import "../styles/globals.css"



// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => JSX.Element
}
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}



const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
	const { pushNotification } = useNotification()
	const { t: commonT } = useTranslation("common")
	const getLayout = Component.getLayout ?? ((page) => page)


	useEffect(() => {
		if (window.sessionStorage.getItem("landingNotificationShowed"))
			return

		pushNotification(commonT("cookieNotification"), {
			type: "info",
			source: "",
		})
		window.sessionStorage.setItem("landingNotificationShowed", "true")
	}, [])


	return (
		getLayout(<Component {...pageProps} />)
	)
}


const ProvidedApp = (props: AppPropsWithLayout) => (
	<SessionProvider session={props.pageProps.session}>
		<ThemePrefProvider>
			<NotificationProvider>
				<MyApp {...props}/>
			</NotificationProvider>
		</ThemePrefProvider>
	</SessionProvider>
)



export default appWithTranslation(ProvidedApp)