import "../styles/globals.css";
import { AppProps } from "next/app";
import ThemePrefProvider from "../contexts/ThemeContext";
import { appWithTranslation } from "next-i18next";





const MyApp = ({ Component, pageProps }: AppProps) => {

return (
  <ThemePrefProvider>
      <Component {...pageProps}/>
  </ThemePrefProvider>
  )
}




export default appWithTranslation(MyApp)