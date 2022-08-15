import "../styles/globals.css";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { AppProps } from "next/app";





type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}


const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? (page => page)

return (
    getLayout(<Component {...pageProps}/>)
  )
}





export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

export default MyApp