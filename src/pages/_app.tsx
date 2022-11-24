import { ReactElement, ReactNode } from "react"
import { NextPage } from "next"
import { AppProps } from "next/app"
import { appWithTranslation } from "next-i18next"

import { NotificationProvider } from "../contexts/NotificationContext"
import ThemePrefProvider from "../contexts/ThemeContext"

import "../styles/globals.css"



// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}


const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
	const getLayout = Component.getLayout ?? ((page) => page)

	return (
		<ThemePrefProvider>
			<NotificationProvider>
				{getLayout(<Component {...pageProps} />)}
			</NotificationProvider>
		</ThemePrefProvider>
	)
}




export default appWithTranslation(MyApp)