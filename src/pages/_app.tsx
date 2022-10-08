import "../styles/globals.css";
import { AppProps } from "next/app";
import ThemePrefProvider from "../contexts/ThemeContext";
import { appWithTranslation } from "next-i18next";
import { NotificationProvider } from "../contexts/NotificationContext";





const MyApp = ({ Component, pageProps }: AppProps) => {

return (
  <ThemePrefProvider>
    <NotificationProvider>
      <Component {...pageProps}/>
    </NotificationProvider>
  </ThemePrefProvider>
  )
}




export default appWithTranslation(MyApp)