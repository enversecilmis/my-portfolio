import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import HeaderNav from "../components/HeaderNav/HeaderNav";
import Intro from "../components/Intro/Intro";
import ThemeToggleButton from "../components/ThemeToggleButton/ThemeToggleButton";
import styles from "../styles/home.module.scss"





const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeaderNav />
      <div className={styles.container}>
        <Intro />
        

      </div>
    </>
  );
};





export default Home;
