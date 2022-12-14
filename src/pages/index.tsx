import { ReactElement } from "react"
import { FaUniversity } from "react-icons/fa"
import { GiStairsGoal } from "react-icons/gi"
import ContentSection from "@components/atoms/ContentSection/ContentSection"
import I18nIcon from "@components/atoms/I18nIcon"
import RoutineIcon from "@components/atoms/RoutineIcon"
import BasicLayout from "@components/layouts/RootLayout"
import Carousel from "@components/molecules/Carousel/Carousel"
import ResponsiveLayoutAnimation from "@components/molecules/ResponsiveLayoutAnimation/ResponsiveLayoutAnimation"
import Goal from "@components/organisms/Goal/Goal"
import Greeting from "@components/organisms/Greeting/Greeting"
import csrImage from "@public/images/csr.png"
import isrImage from "@public/images/isr.png"
import ssgImage from "@public/images/ssg.png"
import ssrImage from "@public/images/ssr.png"
import { GetStaticProps } from "next"
import Head from "next/head"
import Image from "next/legacy/image"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import { NextPageWithLayout } from "./_app"

import styles from "@styles/home.module.scss"




const Home: NextPageWithLayout = () => {
	const { t } = useTranslation("home")

	return (
		<>
			<Head>
				<title>{t("pageTitle")}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>


			<main className={styles.container}>
				<Goal />
				<Greeting/>

				<ContentSection className={styles.whoAmISection} heading={t("whoAmI")} hTag="h2">
					<div className={styles.iconTextContainer}>
						<FaUniversity className={styles.icon}/>
						<span className={styles.text}>
							{t("school")}
							<span className={styles.parentheses}> (Next.js, React Native)</span>
						</span>
					</div>

					<div className={styles.iconTextContainer}>
						<GiStairsGoal className={styles.icon}/>
						<span className={styles.text}>
							{t("goal")}
						</span>
					</div>

					<div className={styles.iconTextContainer}>
						<RoutineIcon className={styles.icon}/>
						<span className={styles.text}>
							{t("routine")}
							<span className={styles.parentheses}>
								{"("}
								<a className={styles.link} rel="noopener noreferrer" target="_blank" href="https://t3.gg/"> Theo, </a>
								<a className={styles.link} rel="noopener noreferrer" target="_blank" href="https://www.youtube.com/c/ReactNext">ReactNext, </a>
								<a className={styles.link} rel="noopener noreferrer" target="_blank" href="https://www.youtube.com/c/Fireship">Fireship, </a>
								<a className={styles.link} rel="noopener noreferrer" target="_blank" href="https://beta.reactjs.org/">React Beta Docs</a>
								{"..."}
								{")"}
							</span>
						</span>
					</div>
				</ContentSection>


				<ContentSection className={styles.whatICanDoSection} heading={t("whatICanDo")} hTag="h2">
					<div>
						<p className={styles.text}>- {t("whatICanDoNext")}</p>
						<p className={styles.text}>- {t("whatICanDoRN")}</p>
					</div>
					<Carousel
						className={styles.sliderContainer}
						sliderClassName={styles.slider}
						titleClassName={styles.sliderTitle}
					>
						<Carousel.Item sliderTitle={t("responsiveDesign")} className={styles.responsiveSlide}>
							<p className={styles.description}>{t("responsiveExplain")}</p>
							<ResponsiveLayoutAnimation className={styles.resLaySvg}/>
						</Carousel.Item>

						<Carousel.Item sliderTitle={t("multilanguageSupport")} className={styles.i18nSlide}>
							<p className={styles.description}>{t("multilanguageExplain")}</p>
							<I18nIcon className={styles.image} size={400}/>
						</Carousel.Item>

						<Carousel.Item className={styles.csrSlide} sliderTitle={t("renderingStrategies")}>
							<div className={styles.description}>
								<h5 className={styles.subTitle}>CSR</h5>
								<span className={styles.descText}>{t("csr")}</span>
							</div>
							<Image placeholder="blur" alt="client side rendering" src={csrImage}/>
						</Carousel.Item>
						<Carousel.Item className={styles.csrSlide} sliderTitle={t("renderingStrategies")}>
							<div className={styles.description}>
								<h5 className={styles.subTitle}>SSR</h5>
								<span className={styles.descText}>{t("ssr")}</span>
							</div>
							<Image placeholder="blur" alt="client side rendering" src={ssrImage}/>
						</Carousel.Item>
						<Carousel.Item className={styles.csrSlide} sliderTitle={t("renderingStrategies")}>
							<div className={styles.description}>
								<h5 className={styles.subTitle}>SSG</h5>
								<span className={styles.descText}>{t("ssg")}</span>
							</div>
							<Image placeholder="blur" alt="client side rendering" src={ssgImage}/>
						</Carousel.Item>
						<Carousel.Item className={styles.csrSlide} sliderTitle={t("renderingStrategies")}>
							<div className={styles.description}>
								<h5 className={styles.subTitle}>ISR</h5>
								<span className={styles.descText}>{t("isr")}</span>
							</div>
							<Image placeholder="blur" alt="client side rendering" src={isrImage}/>
						</Carousel.Item>
					</Carousel>
				</ContentSection>


				<ContentSection className={styles.siteInfoSection} heading={t("usedTech")} hTag="h2">
					<ul className="mt-10">
						<li>- Next.js</li>
						<li>- Sass</li>
						<li>- Vercel (hosting)</li>
						<li>- Figma ({t("usedTechParenthesis")})</li>
						<li>- Framer Motion</li>
					</ul>
				</ContentSection>
			</main>
		</>
	)
}



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
			...(await serverSideTranslations(locale as string, [
				"common",
				"home",
			])),
		},
	}
}

export default Home
