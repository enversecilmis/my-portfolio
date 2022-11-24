import { ReactElement } from "react"
import { GetStaticProps } from "next"
import Head from "next/head"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import BasicLayout from "../../layouts/RootLayout"
import ProjectCardLink from "../../page-components/projects/ProjectCardLink/ProjectCardLink"
import { NextPageWithLayout } from "../_app"

import styles from "../../styles/projects.module.scss"






const Projects: NextPageWithLayout = () => {
	const { t: projectsT } = useTranslation("projects")
	const { t: dictionaryT } = useTranslation("dictionary")


	return (
		<>
			<Head>
				<title>{projectsT("title")}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.container}>
				<p className={styles.pageDescription}>{projectsT("intro")}</p>

				<div className={styles.projects}>
					<ProjectCardLink
						href="/projets/dictionary"
						tFunction={dictionaryT}
					/>
				</div>


			</main>
		</>
	)
}

Projects.getLayout = (page: ReactElement) => {
	return (
		<BasicLayout>
			{page}
		</BasicLayout>
	)
}



export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return { props: { ...(await serverSideTranslations(locale as string, ["common", "header", "projects", "dictionary"])) }}
}



export default Projects