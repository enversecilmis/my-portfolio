import "../styles/globals.css";
import { AppProps } from "next/app";
import ThemePrefProvider from "../contexts/ThemeContext";
import { appWithTranslation } from "next-i18next";
import { NotificationProvider } from "../contexts/NotificationContext";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";



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