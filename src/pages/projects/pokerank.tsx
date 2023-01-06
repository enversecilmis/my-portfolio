import { ReactElement } from "react"
import { useQuery } from "react-query"
import ContentSection from "@components/atoms/ContentSection/ContentSection"
import ThemedButton from "@components/atoms/ThemedButton/ThemedButton"
import BasicLayout from "@components/layouts/RootLayout"
import PokeRankSection from "@components/organisms/PokeRankSection/PokeRankSection"
import PokeScoreSection from "@components/organisms/PokeScoreSection/PokeScoreSection"
import { GetStaticProps } from "next"
import Head from "next/head"
import { useSession } from "next-auth/react"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import { NextPageWithLayout } from "../_app"

import styles from "@styles/pokerank.module.scss"








const Pokerank: NextPageWithLayout = () => {
	const { t: pokerankT } = useTranslation("pokerank")
	const { data: session } = useSession()
	const { refetch, isFetching } = useQuery("pokerankScores", {
		cacheTime: Infinity,
		staleTime: Infinity,
	})


	const updateScore = async () => {
		const res = await fetch("/api/pokerank/update-scores", { method: "POST" })
		const data = await res.json()

		console.log(data)
		if (data.succes)
			refetch()
	}

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


				{session?.user?.email === "enversecilmis1@gmail.com" &&
					<ThemedButton
						onClick={updateScore}
						loading={isFetching}
						label="Update Scores"/>
				}

				<PokeRankSection/>

				<h2 className={styles.scoreboardHeading}>{pokerankT("topPoke")}</h2>

				<PokeScoreSection/>


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