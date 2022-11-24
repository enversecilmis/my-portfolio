import { Head, Html, Main, NextScript } from "next/document"



const Document = () => {
	return (
		<Html>
			<Head>

			</Head>

			<body>
				<script
					dangerouslySetInnerHTML={{
						__html: `
                        const getPref = () => {
                            const storedPref = window.localStorage.getItem('theme-preference')
                            if(storedPref){
                                return storedPref;
                            }
                            window.localStorage.setItem("theme-preference", 'system')
                            return 'system'
                        }
                        
                        const getTheme = (pref) => {
                            if (pref !== 'system'){
                                return pref;
                            }
                            
                            const themeMediaQuery = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
                            if(themeMediaQuery){
                                return themeMediaQuery.matches ? 'dark' : 'light';
                            }
                            return 'light';
                        }
                        
                        document.body.dataset.theme = getTheme( getPref() )
                        `
					}}></script>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}


export default Document