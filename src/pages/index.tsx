import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import ThemeToggleButton from "../components/ThemeToggleButton";
import styles from "../styles/home.module.scss"


// const ThemeToggleButton = dynamic(() => import("../components/ThemeToggleButton"), {
//   ssr: false
// })



const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <div className={styles.container}>
          <p className={styles.welcome}>Hello</p>
          <ThemeToggleButton />
        </div>
      </main>
    </>
  );
};





export default Home;
