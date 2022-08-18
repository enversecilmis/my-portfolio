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
import ResponsiveLayoutAnimation from "../components/ResponsiveLayoutAnimation/ResponsiveLayoutAnimation";
import HorizontalScroller from "../components/HorizontalScroller/HorizontalScroller";






const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <div className={styles.container}>
        <Goal />
        <Intro className="mt-48"/>



        {/* introduction */}
        <TitledSection className={styles.introductionSection} title="Kim bu Enver?">
          <div className={styles.iconTextContainer}>
              <FaUniversity className={styles.icon}/>
              <span className={styles.text}>KTÜ Yazılım Mühendisliği 4.sınıf öğrencisiyim. Okul dışında web ve mobil uygulama geliştirmeye ağırlık veriyorum. <span className={styles.parentheses}>(Next.js, React Native)</span></span>
          </div>

          <div className={styles.iconTextContainer}>
            <GiStairsGoal className={styles.icon}/>
            <span className={styles.text}>Tamtakır geliştirici <span className={styles.parentheses}>(fullstack developer)</span> olma amacıyla her gün kararlı bir şekilde ilerliyorum.</span>
          </div>

          <div className={styles.iconTextContainer}>
            <RoutineIcon className={styles.icon}/>
            <span className={styles.text}>Rutin olarak takip ettiğim kaynaklar sayesinde bilgimi derinleştirirken aynı zamanda gelişen teknolojiler hakkında güncel kalıyorum.
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



        {/* what i know */}
        <TitledSection className={styles.knowledgeSection} title="Ne Biliyorum?">
          <div className={styles.knowledgeContent}>
            <HorizontalScroller/>
          </div>
        </TitledSection>


        <TitledSection className={styles.techStackSection} title="Kullandığım Tech Stack">
          <div className="mt-14">
            <p><a className={styles.linkText} rel="noopener noreferrer" target="_blank" href="https://t3.gg/">Theo</a> tarafından oluşturulan <a className={styles.linkText} rel="noopener noreferrer" target="_blank" href="https://init.tips/">T3-Stack</a> teknoloji setini kullanıyorum.</p>
            <p>Topluluğunun geliştirdiği <a href="https://github.com/t3-oss/create-t3-app"><code className={styles.code}>create-t3-app</code></a> de bunu oldukça kolay bir hale getiriyor.</p>
            <p>Theo ise <a className={styles.linkText} rel="noopener noreferrer" target="_blank" href="https://ping.gg/">Ping Labs</a>&apos; in kurucusu, twitch yayıncısı ve bir youtuber.</p>
            <p>İçerikleri, basit eğitici videolardan bıkmış olanlar için bire bir.</p>
          </div>
        </TitledSection>


        <TitledSection className={styles.siteInfo} title="Bu Site İçin Kullandığım Teknolojiler">
          <ul className="mt-10">
            <li>- Next.js</li>
            <li>- Tailwind</li>
            <li>- Sass</li>
            <li>- Vercel (hosting)</li>
            <li>- Figma (Responsive Layout SVG, render stratejileri PNG&apos;leri)</li>
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