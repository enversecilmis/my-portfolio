import Head from "next/head";
import styles from "../../styles/projects.module.scss";
import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextPageWithLayout } from "../_app";
import { ReactElement, useEffect } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import ProjectsLayout from "../../layouts/ProjectsLayout";
import { useNotification } from "../../contexts/NotificationContext";






const Projects: NextPageWithLayout = () => {


  return (
      <>
        <Head>
          <title>Projects</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.container}>
          <p>Here you can find my algorithm visualization projects.</p>
        </main>
      </>
  )
}

Projects.getLayout = (page: ReactElement) => {
  return (
    <BasicLayout>
      <ProjectsLayout>
        {page}
      </ProjectsLayout>
    </BasicLayout>
  )
}



export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common", "projects", "header", "notifications", "contact-button"])),
    }
  }
}



export default Projects