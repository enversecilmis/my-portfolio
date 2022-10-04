import Head from "next/head";
import styles from "../../styles/projects.module.scss";
import Link from "next/link";
import { HiHome } from "react-icons/hi";
import { NextPage } from "next";






const Projects: NextPage = () => {


    return (
        <div>
            <Head>
                <title>Projects</title>
            </Head>


            <div className={`${styles.container} w-full h-screen`}>
                <Link href="/">
                    <a className="inline-block border-2 rounded-full box-content text-gray-300 border-gray-300 hover:text-gray-50 hover:border-gray-50 p-1 m-2 transition-colors duration-300">
                        <HiHome size={30} />
                    </a>
                </Link>

                <div className="flex flex-col items-center text-gray-100 md:text-5xl sm:text-3xl text-3xl font-mono shadow-md pb-7">
                    <h1>My Projects</h1>
                    <h2 className="mt-6 sm:text-2xl text-xl">Coming Soon...</h2>
                </div>
            </div>


        </div>
    )
}





export default Projects