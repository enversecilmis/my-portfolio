import { ReactElement, useEffect, useState } from "react"
import ContentSection from "@components/atoms/ContentSection/ContentSection"
import Star from "@components/atoms/Star/Star"
import Trash from "@components/atoms/Trash/Trash"
import BasicLayout from "@components/layouts/RootLayout"
import PokemonDeck, { DeckDragHandler, DeckDropHandler } from "@components/organisms/PokemonDeck/PokemonDeck"
import PokeRankSection from "@components/organisms/PokeRankSection/PokeRankSection"
import interpolate from "@utils/interpolate"
import { rndNum } from "@utils/random-number"
import randomNumberArray from "@utils/random-number-array"
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