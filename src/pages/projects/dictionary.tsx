import { ReactElement, useRef, useState } from "react"
import BasicStats from "@components/atoms/BasicStats/BasicStats"
import BoxSection from "@components/atoms/BoxSection/BoxSection"
import ContentSection from "@components/atoms/ContentSection/ContentSection"
import Histogram from "@components/molecules/Histogram/Histogram"
import getErrorMessage from "@utils/get-error-message"
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
	DictionaryTypeError,
	ReturnTypeError,
	TableSizeError,
} from "../../projects-src/hashtabledict/errors"
import { ArrayDictionary, HashTableDictionary } from "../../projects-src/hashtabledict/hashtabledict"
import {
	CollisionHandler,
	HashStringFunction,
} from "../../projects-src/hashtabledict/types"
import evalCollisionHandler from "../../projects-src/hashtabledict/utils/eval-collision-handler"
import evalHashFunction from "../../projects-src/hashtabledict/utils/eval-hash-function"
import runCreateTableArrWorker from "../../projects-src/hashtabledict/utils/run-create-table-arr-worker"
import { NextPageWithLayout } from "../_app"

import styles from "../../styles/dictionary.module.scss"




// TODO: Simplify this code.

const Dictionary: NextPageWithLayout = () => {
	// Dictionaries
	const [arrDict, setArrDict] = useState<ArrayDictionary>()
	const [hashDict, setHashDict] = useState<HashTableDictionary>()

	// Input states
	const [fileContent, setFileContent] = useState<FileContent>()
	const [wordSeperator, setWordSeperator] = useState("")
	const [pairSeperator, setPairSeperator] = useState("")
	const [tableSize, setTableSize] = useState(0)
	const [hashFunctionString, setHashFunctionString] = useState("")
	const [collisionHandlerString, setCollisionHandlerString] = useState("")
	const [throwCollisionLoopError, setCollisionLoopError] = useState(false)

	const hashFunction = useRef<HashStringFunction>()
	const collisionHandler = useRef<CollisionHandler>()
	const resetKey = useRef(0)

	const { t: dictionaryT } = useTranslation("dictionary")
	const { t: commonT } = useTranslation("common")
	const { pushNotification } = useNotification()
	const toScrollElement = useRef<HTMLDivElement>(null)



	const validateHashFunction = () => {
		try {
			hashFunction.current = evalHashFunction(`(input) => {${hashFunctionString}}`)
			return true
		}
		catch (error) {
			hashFunction.current = undefined
			const message = getErrorMessage(error, [
				[ReturnTypeError, `${dictionaryT("returnTypeNumberError")}`],
				["default", "Unknown Error"],
			])

			pushNotification(message, {
				type: "error",
				source: dictionaryT("hashFuncInput"),
				duration: 6000,
			})
			return false
		}
	}


	const validateCollisionHandler = () => {
		try {
			collisionHandler.current = evalCollisionHandler(
				`(currentHashValue, input, iteration) => {${collisionHandlerString}}`,
			)
			return true
		}
		catch (error) {
			collisionHandler.current = undefined
			const message = getErrorMessage(error, [
				[ReturnTypeError, `${dictionaryT("returnTypeNumberError")}`],
				["default", "Unknown Error"],
			])

			pushNotification(message, {
				type: "error",
				source: dictionaryT("collisionHandlerInput"),
			})
			return false
		}
	}

	const createHashTable = async () => {
		try {
			if (hashFunction.current === undefined ||
				collisionHandler.current === undefined ||
				arrDict === undefined)
				return

			// Create the table in worker
			const { tableArray, allCollisions } = await runCreateTableArrWorker(arrDict.dictArray, {
				hashFunction: hashFunction.current,
				collisionHandler: collisionHandler.current,
				tableSize,
				throwCollisionLoopError,
			})

			const hashTableDict = new HashTableDictionary(tableArray, {
				hashFunction: hashFunction.current,
				collisionHandler: collisionHandler.current,
				allCollisions,
				throwCollisionLoopError,
			})

			setHashDict(hashTableDict)
			toScrollElement.current?.scrollIntoView({ behavior: "smooth" })
			resetKey.current++
		}
		catch (error) {
			const message = getErrorMessage(error, [
				[DictionaryTypeError, `${dictionaryT("createDictArrError")}`],
				[TableSizeError, `${dictionaryT("hashTableSizeError")}`],
			])

			pushNotification(message, {
				type: "error",
				source: dictionaryT("createDictArr"),
				duration: 6000,
			})
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
					onFinish={createHashTable}>
					<MultistepForm.Item disableNext={!arrDict}>
						<CreateDictionaryArray
							fileContentState={[fileContent, setFileContent]}
							wordSeperatorState={[wordSeperator, setWordSeperator]}
							pairSeperatorState={[pairSeperator, setPairSeperator]}
							arrDictState={[arrDict, setArrDict]}/>
					</MultistepForm.Item>

					<MultistepForm.Item
						onNext={validateHashFunction}>
						<GetHashFunction
							hashFunctionStringState={[hashFunctionString, setHashFunctionString]}/>
					</MultistepForm.Item>

					<MultistepForm.Item
						onNext={validateCollisionHandler}>
						<GetCollisionHandler
							collisionHandlerStringState={[collisionHandlerString, setCollisionHandlerString]}
							throwCollisionLoopErrorState={[throwCollisionLoopError, setCollisionLoopError]}/>
					</MultistepForm.Item>

					<MultistepForm.Item>
						<GetTableSize
							hashTableSizeState={[tableSize, setTableSize]}
							arrDict={arrDict}/>
					</MultistepForm.Item>
				</MultistepForm>


				<div
					key={resetKey.current}
					ref={toScrollElement}
					className={styles.tableReadySection}>
					{hashDict && arrDict &&
					<>
						<BoxSection
							className={styles.searchSection}
							heading={dictionaryT("searchInDictionaries")} hTag="h2">
							<DictionarySearch
								hashDict={hashDict}
								arrDict={arrDict}/>
						</BoxSection>

						<BoxSection
							className={styles.statSection}
							heading={dictionaryT("collisionStats")}
							hTag="h2">
							<BasicStats
								title={"Temel İstatistikler"}
								array={hashDict.allCollisions}
								postfix={commonT("collision")}
								fractionDigits={3}/>
							<Histogram
								title={dictionaryT("collisionsHistogram")}
								array={hashDict.allCollisions}
								tagX={dictionaryT("collisionsTag")}
								tagY={dictionaryT("occurenceTag")}
								fractionDigits={3}/>
						</BoxSection>

						<BoxSection
							className={styles.searchSection}
							heading={dictionaryT("comparison")}
							hTag="h2">
							<CompareDictionaries
								arrDict={arrDict}
								hashDict={hashDict}/>
						</BoxSection>
					</>
					}
				</div>
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
