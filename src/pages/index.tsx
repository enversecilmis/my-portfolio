import Image from "next/image";
import Head from "next/head";
import { GetStaticProps } from "next";
import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";

import Goal from "../components/Goal/Goal";
import BasicLayout from "../layouts/BasicLayout";
import TitledSection from "../components/TitledSection/TitledSection";
import { FaUniversity } from "react-icons/fa";
import { GiStairsGoal } from "react-icons/gi";
import RoutineIcon from "../components/RoutineIcon";
import HorizontalScroller from "../components/HorizontalScroller/HorizontalScroller";

import styles from "../styles/home.module.scss"
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";






const Home: NextPageWithLayout = (props) => {
  const { t } = useTranslation('home')
  
  
  return (
    <>
      <Head>
        <title>{t('pageTitle')}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <div className={styles.container}>
        <Goal />

        <section  className={styles.introSection}>
            <div className={styles.ppContainer}>
                <Image src="/pp.jpg" alt='profile picture' layout={"fill"} objectFit={"contain"} className={styles.pp} />
            </div>
            <div className={styles.introText}>
                <p className={styles.title}>Hello World!</p>
                <p className={styles.text}>
                  {t('intro')}
                </p>
            </div>
        </section>


        <TitledSection className={styles.whoAmISection} title={t('whoAmI')}>
          <div className={styles.iconTextContainer}>
              <FaUniversity className={styles.icon}/>
              <span className={styles.text}>
                {t('school')}
                <span className={styles.parentheses}>(Next.js, React Native)</span>
              </span>
          </div>

          <div className={styles.iconTextContainer}>
            <GiStairsGoal className={styles.icon}/>
            <span className={styles.text}>
              {t('goal')}
            </span>
          </div>

          <div className={styles.iconTextContainer}>
            <RoutineIcon className={styles.icon}/>
            <span className={styles.text}>
              {t('routine')}
              <span className={styles.parentheses}> (
                <a className={styles.link} rel="noopener noreferrer" target="_blank" href="https://t3.gg/"> Theo, </a>
                <a className={styles.link} rel="noopener noreferrer" target="_blank" href="https://www.youtube.com/c/ReactNext">ReactNext, </a>
                <a className={styles.link} rel="noopener noreferrer" target="_blank" href="https://www.youtube.com/c/Fireship">Fireship, </a>
                <a className={styles.link} rel="noopener noreferrer" target="_blank" href="https://beta.reactjs.org/">React Beta Docs</a>
                ...
              )</span>
            </span>
          </div>
        </TitledSection>


        <TitledSection className={styles.knowledgeSection} title={t('whatICanDo')}>
          <div className={styles.knowledgeContent}>
            <HorizontalScroller/>
          </div>
        </TitledSection>


        <TitledSection className={styles.techStackSection} title={t('techStack')}>
          <div className="mt-14">
            <p>
              {t('techStackp')}
            </p>
          </div>
        </TitledSection>


        <TitledSection className={styles.siteInfo} title={t('usedTech')}>
          <ul className="mt-10">
            <li>- Next.js</li>
            <li>- Tailwind</li>
            <li>- Sass</li>
            <li>- Vercel (hosting)</li>
            <li>- Figma ({t('usedTechParenthesis')})</li>
          </ul>
        </TitledSection>

      </div>
    </>
  );
};






Home.getLayout = (page: ReactElement) => {
  return (
    <BasicLayout>
      {page}
    </BasicLayout>
  )
}


export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common", "home"])),
    }
  }
}

export default Home;