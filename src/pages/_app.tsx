import { ReactElement, useEffect } from "react"
import { useNotification } from "@contexts/NotificationContext"
import { NextPage } from "next"
import { AppProps } from "next/app"
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
	const getLayout = Component.getLayout ?? ((page) => page)
	const { pushNotification } = useNotification()
	const { t: commonT } = useTranslation("common")

	useEffect(() => {
		const showed = window.sessionStorage.getItem("firstNotification")

		if (showed)
			return

		pushNotification(commonT("inConstruction"), {
			type: "info",
			source: "",
		})
		pushNotification(commonT("cookieNotification"), {
			type: "info",
			source: "",
		})
		window.sessionStorage.setItem("firstNotification", "true")
	}, [commonT, pushNotification])

	return (
		getLayout(<Component {...pageProps} />)
	)
}

const ProvidedApp = (props: AppPropsWithLayout) => (
	<ThemePrefProvider>
		<NotificationProvider>
			<MyApp {...props}/>
		</NotificationProvider>
	</ThemePrefProvider>
)


export default appWithTranslation(ProvidedApp)