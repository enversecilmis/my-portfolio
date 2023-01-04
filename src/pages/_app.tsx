import { ReactElement } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import FirstNotification from "@components/atoms/FirstNotification/FirstNotification"
import { NextPage } from "next"
import { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"
import { appWithTranslation } from "next-i18next"

import NotificationProvider from "../contexts/NotificationContext"
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
	const getLayout = Component.getLayout ?? ((page) => page)

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
					<FirstNotification />
				</NotificationProvider>
			</ThemePrefProvider>
		</QueryClientProvider>
	</SessionProvider>
)



export default appWithTranslation(ProvidedApp)