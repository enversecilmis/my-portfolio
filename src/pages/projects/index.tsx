import Head from "next/head";
import styles from "../../styles/projects.module.scss";
import { GetStaticProps, NextPage } from "next";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import ContactButton from "../../components/ContactButton/ContactButton";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import BasicLayout from "../../layouts/BasicLayout";






const Projects: NextPageWithLayout = () => {


    return (
        <div>
            <Head>
                <title>Projects</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            
            <div className={styles.container}>
              




            </div>
        </div>
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
        ...(await serverSideTranslations(locale as string, ["common", "projects", "header", "notifications", "contact-button"])),
      }
    }
  }



export default Projects