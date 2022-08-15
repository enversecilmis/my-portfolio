import Head from "next/head";
import { ReactElement } from "react";
import HeaderNav from "../components/HeaderNav/HeaderNav";
import Intro from "../components/Intro/Intro";
import Slider from "../components/Slider/Slider";
import BasicLayout from "../layouts/BasicLayout";
import styles from "../styles/home.module.scss"
import { NextPageWithLayout } from "./_app";





const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <Intro />
        <Slider />
        

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
