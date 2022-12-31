import { ReactElement } from "react"
import RootLayout from "@components/layouts/RootLayout"
import ProjectCardLink from "@components/molecules/ProjectCardLink/ProjectCardLink"
import { GetStaticProps } from "next"
import Head from "next/head"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import { NextPageWithLayout } from "../_app"

import styles from "@styles/projects.module.scss"



const projects = [
	"dictionary",
	"pokerank",
]


const Projects: NextPageWithLayout = () => {
	const { t: projectsT } = useTranslation("projects")



	return (
		<>
			<Head>
				<title>{projectsT("title")}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.container}>
				<p className={styles.pageDescription}>{projectsT("intro")}</p>

				<div className={styles.projects}>
					{projects.map((pname, idx) => (
						<ProjectCardLink
							key={idx}
							href={`/projects/${pname}`}
							description={projectsT(`${pname}Description`)}
							title={projectsT(`${pname}Title`)}
						/>
					))}
				</div>


			</main>
		</>
	)
}

Projects.getLayout = (page: ReactElement) => {
	return (
		<RootLayout>
			{page}
		</RootLayout>
	)
}



export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale as string, [
				"common",
				"projects",
			])),
		},
	}
}



export default Projects