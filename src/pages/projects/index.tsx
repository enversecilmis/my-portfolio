import Head from "next/head";
import styles from "../../styles/projects.module.scss";
import { GetStaticProps, NextPage } from "next";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import ContactButton from "../../components/ContactButton/ContactButton";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";






const Projects: NextPage = () => {


    return (
        <div>
            <Head>
                <title>Projects</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <HeaderNav/>
            <ContactButton/>
            
            <div className={styles.container}>
              




            </div>
        </div>
    )
}



export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
      props: {
        ...(await serverSideTranslations(locale as string, ["common", "projects", "header", "notifications"])),
      }
    }
  }



export default Projects