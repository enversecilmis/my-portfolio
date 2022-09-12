import "../styles/globals.css";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { AppProps } from "next/app";
import ThemePrefProvider from "../contexts/ThemeContext";
import { appWithTranslation } from "next-i18next";





type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}


const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? (page => page)

return (
  <ThemePrefProvider>
      {getLayout(<Component {...pageProps}/>)}
  </ThemePrefProvider>
  )
}





export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

export default appWithTranslation(MyApp)