import Head from "next/head";
import styles from "../../styles/projects.module.scss";
import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextPageWithLayout } from "../_app";
import { ReactElement, useEffect } from "react";
import BasicLayout from "../../layouts/RootLayout";
import Link from "next/link";
import { useTranslation } from "next-i18next";




const clipText = (text: string, maxCharacters: number) => {
  return `${text.slice(0,maxCharacters)}...`
}

const Projects: NextPageWithLayout = () => {
  const { t } = useTranslation("projects")
  const { t: dictionaryT } = useTranslation("dictionary")


  return (
      <>
        <Head>
          <title>{t("title")}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.container}>
          <p className={styles.pageDescription}>Here you can find my algorithm visualization projects.</p>

          <Link className={styles.projectLinkCard} href={"/projects/dictionary"}>
            <h4 className={styles.cardTitle}>{t("hashTableDictionary")}</h4>
            <div className={styles.cardContent}>
              {dictionaryT("description")}
            </div>
          </Link>

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