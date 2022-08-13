import { Head, Html, Main, NextScript } from "next/document"



const Document = () => {

    const setInitialTheme = `
        function getUserPreference() {
            if(window.localStorage.getItem('theme')) {
                return window.localStorage.getItem('theme')
            }
            return window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light'
        }
        document.body.dataset.theme = getUserPreference();
    `

    return (
        <Html lang="en">
            <Head>
                
            </Head>

            <body>
                <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}


export default Document