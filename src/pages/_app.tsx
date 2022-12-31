import { ReactElement, useEffect } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
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


const queryClient = new QueryClient()


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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])


	return (
		getLayout(<Component {...pageProps} />)
	)
}


const ProvidedApp = (props: AppPropsWithLayout) => (
	<SessionProvider session={props.pageProps.session}>
		<QueryClientProvider client={queryClient}>
			<ThemePrefProvider>
				<NotificationProvider>
					<MyApp {...props}/>
				</NotificationProvider>
			</ThemePrefProvider>
		</QueryClientProvider>
	</SessionProvider>
)



export default appWithTranslation(ProvidedApp)