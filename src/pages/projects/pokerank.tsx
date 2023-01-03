import { ReactElement } from "react"
import ContentSection from "@components/atoms/ContentSection/ContentSection"
import BasicLayout from "@components/layouts/RootLayout"
import PokeRankSection from "@components/organisms/PokeRankSection/PokeRankSection"
import PokeScoreSection from "@components/organisms/PokeScoreSection/PokeScoreSection"
import { GetStaticProps } from "next"
import Head from "next/head"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import { NextPageWithLayout } from "../_app"

import styles from "@styles/pokerank.module.scss"








const Pokerank: NextPageWithLayout = () => {
	const { t: pokerankT } = useTranslation("pokerank")


	return (
		<>
			<Head>
				<title>Pokerank</title>
			</Head>

			<ContentSection
				containerClassName={styles.outerContainer}
				className={styles.container}
				heading={pokerankT("title")}
				hTag="h1">

				<p className={styles.description}>
					{pokerankT("description")}
				</p>

				<PokeRankSection/>
				{/* <PokeScoreSection/> */}


			</ContentSection>
		</>
	)
}



Pokerank.getLayout = (page: ReactElement) => {
	return (
		<BasicLayout>
			{page}
		</BasicLayout>
	)
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale as string, [
				"common",
				"pokerank",
			])),
		},
	}
}


export default Pokerank