import { ReactElement, useEffect, useRef, useState } from "react"
import BasicStats from "@components/atoms/BasicStats/BasicStats"
import BoxSection from "@components/atoms/BoxSection/BoxSection"
import ContentSection from "@components/atoms/ContentSection/ContentSection"
import Histogram from "@components/molecules/Histogram/Histogram"
import { GetStaticProps } from "next"
import Head from "next/head"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { FileContent } from "use-file-picker"

import RootLayout from "../../components/layouts/RootLayout"
import MultistepForm from "../../components/molecules/MultistepForm/MultistepForm"
import CompareDictionaries from "../../components/organisms/CompareDictionaries/CompareDictionaries"
import CreateDictionaryArray from "../../components/organisms/CreateDictionaryArray/CreateDictionaryArray"
import DictionarySearch from "../../components/organisms/DictionarySearch/DictionarySearch"
import GetCollisionHandler from "../../components/organisms/GetCollisionHandler/GetCollisionHandler"
import GetHashFunction from "../../components/organisms/GetHashFunction/GetHashFunction"
import GetTableSize from "../../components/organisms/GetTableSize/GetTableSize"
import { useNotification } from "../../contexts/NotificationContext"
import {
	DictionaryTypeException,
	TableSizeException,
} from "../../projects-src/hashtabledict/exceptions"
import { createHashTableFromDictionary } from "../../projects-src/hashtabledict/hashtabledict"
import {
	CollisionHandler,
	DictionaryArray,
	DictionaryHashTable,
	HashStringFunction,
} from "../../projects-src/hashtabledict/types"
import { NextPageWithLayout } from "../_app"

import styles from "../../styles/dictionary.module.scss"



// TODO: Simplify this code.

const Dictionary: NextPageWithLayout = () => {
	// Dictionaries
	const [dictionary, setDictionary] = useState<DictionaryArray>()
	const [hashTableDictionary, setHashTableDictionary] = useState<DictionaryHashTable>()

	// Input states
	const [fileContent, setFileContent] = useState<FileContent>()
	const [wordSeperator, setWordSeperator] = useState("")
	const [pairSeperator, setPairSeperator] = useState("")
	const [hashTableSize, setHashTableSize] = useState(0)
	const [hashFunctionString, setHashFunctionString] = useState("")
	const [collisionHandlerString, setCollisionHandlerString] = useState("")
	const [throwInfiniteLoopError, setThrowInfiniteLoopError] = useState(false)

	const { t: dictionaryT } = useTranslation("dictionary")
	const { t: commonT } = useTranslation("common")
	const { pushNotification } = useNotification()
	const toScrollElement = useRef<HTMLDivElement>(null)
	const key = useRef(0)


	useEffect(() => {
		if (!toScrollElement.current)
			return
		toScrollElement.current.scrollIntoView({ behavior: "smooth" })
	}, [hashTableDictionary])



	const validateInputsAndCreateHashTable = () => {
		let hashFunction: HashStringFunction | undefined
		let collisionHandler: CollisionHandler | undefined

		// Validate hash function.
		try {
			const hashFunctionEval = eval(`(input) => {${hashFunctionString}}`)
			const hashFuncOutput = hashFunctionEval("helo")

			if (typeof hashFuncOutput !== "number")
				throw new Error(dictionaryT("returnTypeNumberError"))

			hashFunction = hashFunctionEval
		} catch (error) {
			hashFunction = undefined
			if (error instanceof Error) {
				pushNotification(error.toString(), {
					type: "error",
					source: dictionaryT("hashFuncInput"),
				})
			}
		}

		// Validate collision handler.
		try {
			const collisionHandlerEval = eval(
				`(currentHashValue, input, iteration) => {${collisionHandlerString}}`,
			)
			const collisionFuncOutput = collisionHandlerEval(19, "helo", 1)

			if (typeof collisionFuncOutput !== "number")
				throw new Error(dictionaryT("returnTypeNumberError"))

			collisionHandler = collisionHandlerEval
		} catch (error) {
			collisionHandler = undefined
			if (error instanceof Error) {
				pushNotification(error.toString(), {
					type: "error",
					source: dictionaryT("collisionHandlerInput"),
				})
			}
		}

		// Try to create hash table dictionary.
		try {
			if (hashFunction === undefined || collisionHandler === undefined || dictionary === undefined)
				return

			const hashTable = createHashTableFromDictionary(dictionary, {
				hashFunction,
				collisionHandler,
				hashTableSize,
				throwInfiniteLoopError,
			})


			setHashTableDictionary(hashTable)
			key.current++
		} catch (error) {
			if (error instanceof DictionaryTypeException) {
				const message = dictionaryT("createDictArrError")

				pushNotification(message, {
					type: "error",
					source: dictionaryT("createDictArr"),
					durationSeconds: 6000,
				})
				return
			}
			if (error instanceof TableSizeException) {
				const message = `${error.message}\r\n${dictionaryT("hashTableSizeError")}`

				pushNotification(message, {
					type: "error",
					source: dictionaryT("createDictArr"),
					durationSeconds: 6000,
				})
				return
			}
			if (error instanceof Error) {
				pushNotification(error.toString(), {
					type: "error",
					source: dictionaryT("createDictArr"),
					durationSeconds: 6000,
				})
			}
		}
	}



	return (
		<>
			<Head>
				<title>{dictionaryT("title")}</title>
			</Head>

			<ContentSection
				heading={dictionaryT("title")}
				hTag="h1"
				containerClassName={styles.outerContainer}
				className={styles.container}
			>
				<p className={styles.description}>{dictionaryT("description")}</p>

				<MultistepForm
					className={styles.multiStepForm}
					onFinish={validateInputsAndCreateHashTable}
				>
					<MultistepForm.Item disableNext={!dictionary}>
						<CreateDictionaryArray
							fileContentState={[fileContent, setFileContent]}
							wordSeperatorState={[wordSeperator, setWordSeperator]}
							pairSeperatorState={[pairSeperator, setPairSeperator]}
							dictionaryState={[dictionary, setDictionary]}
						/>
					</MultistepForm.Item>
					<GetHashFunction
						hashFunctionStringState={[hashFunctionString, setHashFunctionString]}
					/>
					<GetCollisionHandler
						collisionHandlerStringState={[collisionHandlerString, setCollisionHandlerString]}
						throwInfiniteLoopErrorState={[throwInfiniteLoopError, setThrowInfiniteLoopError]}
					/>
					<GetTableSize
						hashTableSizeState={[hashTableSize, setHashTableSize]}
						dictionaryArray={dictionary}
					/>
				</MultistepForm>


				{hashTableDictionary && dictionary &&
				<div key={key.current} ref={toScrollElement} className={styles.tableReadySection}>

					<BoxSection className={styles.searchSection} heading={dictionaryT("searchInDictionaries")} hTag="h2">
						<DictionarySearch
							hashDictionary={hashTableDictionary}
							dictionary={dictionary}
						/>
					</BoxSection>

					<BoxSection className={styles.statSection} heading={dictionaryT("collisionStats")} hTag="h2">
						<BasicStats
							title={"Temel İstatistikler"}
							array={hashTableDictionary.allCollisions}
							postfix={commonT("collision")}
							fractionDigits={3}
						/>
						<Histogram
							title={dictionaryT("collisionsHistogram")}
							array={hashTableDictionary.allCollisions}
							tagX={dictionaryT("collisionsTag")}
							tagY={dictionaryT("occurenceTag")}
							fractionDigits={3}
						/>
					</BoxSection>

					<BoxSection className={styles.searchSection} hTag="h2" heading={dictionaryT("comparison")}>
						<CompareDictionaries
							dictionary={dictionary}
							hashDictionary={hashTableDictionary}
						/>
					</BoxSection>
				</div>
				}
			</ContentSection>
		</>
	)
}



Dictionary.getLayout = (page: ReactElement) => {
	return <RootLayout>{page}</RootLayout>
}
export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale as string, [
				"common",
				"projects",
				"dictionary",
			])),
		},
	}
}
export default Dictionary
