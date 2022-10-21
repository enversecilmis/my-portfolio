import { useTranslation } from "next-i18next"
import Link from "next/link"
import { useRouter } from "next/router"
import { ReactNode } from "react"
import styles from "./ProjectsLayout.module.scss"






const ProjectsLayout: React.FC<{ children: ReactNode }> = ({ children }) => {

    const { t } = useTranslation("projects")
    const { asPath } = useRouter()

    return (
        <div className={styles.container}>
            <nav className={styles.nav}>
                <h1 className={styles.title}>{t("title")}</h1>
                <Link href={"/projects/dijkstra"}>
                    <a>Dijkstra</a>
                </Link>
                <Link href={"/projects/dictionary"}>
                    <a>{t("hashTableDictionary")}</a>
                </Link>
                <Link href={"/projects/primenumbers"}>
                    <a>{t("primesOnParallel")}</a>
                </Link>
            </nav>

            <main className={styles.main}>
                {children}
            </main>
        </div>
    )
}








export default ProjectsLayout