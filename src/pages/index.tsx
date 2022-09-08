import Head from "next/head";
import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import Goal from "../components/Goal/Goal";
import Intro from "../components/Intro/Intro";
import BasicLayout from "../layouts/BasicLayout";
import styles from "../styles/home.module.scss"
import TitledSection from "../components/TitledSection/TitledSection";
import { FaUniversity } from "react-icons/fa";
import { GiStairsGoal } from "react-icons/gi";
import RoutineIcon from "../components/RoutineIcon";
import HorizontalScroller from "../components/HorizontalScroller/HorizontalScroller";

import homeTextsEn from "../locale/en/home";
import homeTextsTr from "../locale/tr/home";
import { useRouter } from "next/router";







const Home: NextPageWithLayout = () => {
  const {locale} = useRouter()
  const t = locale === 'en'? homeTextsEn : homeTextsTr

  return (
    <>
      <Head>
        <title>{t.pageTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <div className={styles.container}>
        <Goal />
        <Intro className="mt-48"/>


        <TitledSection className={styles.introductionSection} title={t.whoAmI}>
          <div className={styles.iconTextContainer}>
              <FaUniversity className={styles.icon}/>
              <span className={styles.text}>
                {t.school}
                <span className={styles.parentheses}>(Next.js, React Native)</span>
              </span>
          </div>

          <div className={styles.iconTextContainer}>
            <GiStairsGoal className={styles.icon}/>
            <span className={styles.text}>
              {t.goal}
            </span>
          </div>

          <div className={styles.iconTextContainer}>
            <RoutineIcon className={styles.icon}/>
            <span className={styles.text}>
              {t.routine}
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


        <TitledSection className={styles.knowledgeSection} title={t.whatICanDo}>
          <div className={styles.knowledgeContent}>
            <HorizontalScroller/>
          </div>
        </TitledSection>


        <TitledSection className={styles.techStackSection} title={t.techStack}>
          <div className="mt-14">
            <p>
              {t.techStackp}
            </p>
          </div>
        </TitledSection>


        <TitledSection className={styles.siteInfo} title={t.usedTech}>
          <ul className="mt-10">
            <li>- Next.js</li>
            <li>- Tailwind</li>
            <li>- Sass</li>
            <li>- Vercel (hosting)</li>
            <li>- Figma ({t.usedTechParenthesis})</li>
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

export default Home;