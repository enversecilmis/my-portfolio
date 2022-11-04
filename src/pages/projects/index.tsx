import Head from "next/head";
import styles from "../../styles/projects.module.scss";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import BasicLayout from "../../layouts/RootLayout";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import ProjectCardLink from "../../page-components/projects/ProjectCardLink/ProjectCardLink";






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
          <p className={styles.pageDescription}>Here you can find some of my projects</p>

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
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common", "header", "projects", "dictionary"])),
    }
  }
}



export default Projects