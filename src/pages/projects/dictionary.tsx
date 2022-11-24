import { ReactElement, useEffect, useRef, useState } from "react"
import { GetStaticProps } from "next"
import Head from "next/head"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { FileContent } from "use-file-picker"

import MultistepForm from "../../components/MultistepForm/MultistepForm"
import StatDisplay from "../../components/StatDisplay/StatDisplay"
import TitledSection from "../../components/TitledSection/TitledSection"
import { useNotification } from "../../contexts/NotificationContext"
import RootLayout from "../../layouts/RootLayout"
import CompareDictionaries from "../../page-components/projects/dictionary/CompareDictionaries/CompareDictionaries"
import CreateDictionaryArray from "../../page-components/projects/dictionary/CreateDictionaryArray/CreateDictionaryArray"
import GetCollisionHandler from "../../page-components/projects/dictionary/GetCollisionHandler/GetCollisionHandler"
import GetHashFunction from "../../page-components/projects/dictionary/GetHashFunction/GetHashFunction"
import GetTableSize from "../../page-components/projects/dictionary/GetTableSize/GetTableSize"
import TableInteractions from "../../page-components/projects/dictionary/TableInteractions/TableInteractions"
import {
	DictionaryTypeException,
	TableSizeException,
} from "../../projects-src/hashtabledict/exceptions"
import { createHashTableFromDictionary } from "../../projects-src/hashtabledict/hashtabledict"
import {
	Dictionary,
	DictionaryHashTable,
	HashStringFunction,
	OnCollisionNextIndexHandler,
} from "../../projects-src/hashtabledict/types"
import { NextPageWithLayout } from "../_app"

import styles from "../../styles/dictionary.module.scss"

const Dictionary: NextPageWithLayout = () => {
	const { t: dictionaryT } = useTranslation("dictionary")
	const { t: projectsT } = useTranslation("projects")
	const { pushNotification } = useNotification()
	const toScrollElement = useRef<HTMLDivElement>(null)

	// Dictionaries
	const [dictionary, setDictionary] = useState<Dictionary>()
	const [hashTableDictionary, setHashTableDictionary] =
    useState<DictionaryHashTable>()

	// Input states
	const [fileContent, setFileContent] = useState<FileContent>()
	const [wordSeperator, setWordSeperator] = useState("")
	const [pairSeperator, setPairSeperator] = useState("")
	const [hashTableSize, setHashTableSize] = useState(0)
	const [hashFunctionString, setHashFunctionString] = useState("")
	const [collisionHandlerString, setCollisionHandlerString] = useState("")
	const [throwInfiniteLoopError, setThrowInfiniteLoopError] = useState(false)

	useEffect(() => {
		if (!toScrollElement.current)
			return
		toScrollElement.current.scrollIntoView({ behavior: "smooth" })
	}, [hashTableDictionary])

	const validateInputsAndCreateHashTable = () => {
		let hashFunction: HashStringFunction | undefined
		let collisionHandler: OnCollisionNextIndexHandler | undefined

		// Validate hash function.
		try {
			const hashFunctionEval = eval(`(input) => {${hashFunctionString}}`)
			const hashFuncOutput = hashFunctionEval("helo")

			if (typeof hashFuncOutput !== "number")
				throw new Error("Return type is not a number.")

			hashFunction = hashFunctionEval
		} catch (error: any) {
			hashFunction = undefined
			pushNotification(error.toString() as string, {
				type: "error",
				source: "Hash Function Input",
			})
		}

		// Validate collision handler.
		try {
			const collisionHandlerEval = eval(
				`(currentHashValue, input, iteration) => {${collisionHandlerString}}`,
			)
			const collisionFuncOutput = collisionHandlerEval(19, "helo", 1)

			if (typeof collisionFuncOutput !== "number")
				throw new Error("Return type is not a number.")

			collisionHandler = collisionHandlerEval
		} catch (error: any) {
			collisionHandler = undefined
			pushNotification(error.toString(), {
				type: "error",
				source: "Collision Handler Input",
			})
		}

		// Try to create hash table dictionary.
		try {
			if (
				hashFunction === undefined ||
        collisionHandler === undefined ||
        dictionary === undefined
			)
				return

			const hashTable = createHashTableFromDictionary(dictionary, {
				hashFunction,
				collisionHandler,
				hashTableSize,
				throwInfiniteLoopError,
			})

			setHashTableDictionary(hashTable)
		} catch (error: any) {
			if (error instanceof DictionaryTypeException) {
				const message = `${error.message}\r\nPlease check seperators or the text file.`

				pushNotification(message, {
					type: "error",
					source: "Create Hash Table",
					durationSeconds: 6000,
				})
				return
			}
			if (error instanceof TableSizeException) {
				const message = `${error.message}\r\nPlease give a larger table size value.`

				pushNotification(message, {
					type: "error",
					source: "Create Hash Table",
					durationSeconds: 6000,
				})
				return
			}
			pushNotification(error.toString(), {
				type: "error",
				source: "Create Hash Table",
				durationSeconds: 6000,
			})
		}
	}

	return (
		<>
			<Head>
				<title>Dictionary</title>
			</Head>

			<TitledSection
				title={dictionaryT("title")}
				containerClassName={styles.outerContainer}
				contentClassName={styles.container}
			>
				{/* <h1 className={styles.pageTitle}>{dictionaryT("title")}</h1> */}
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
						hashFunctionStringState={[
							hashFunctionString,
							setHashFunctionString,
						]}
					/>
					<GetCollisionHandler
						collisionHandlerStringState={[
							collisionHandlerString,
							setCollisionHandlerString,
						]}
						throwInfiniteLoopErrorState={[
							throwInfiniteLoopError,
							setThrowInfiniteLoopError,
						]}
					/>
					<GetTableSize
						hashTableSizeState={[hashTableSize, setHashTableSize]}
						dictionaryArray={dictionary}
					/>
				</MultistepForm>

				{hashTableDictionary && dictionary && (
					<div className={styles.hashTableContainer}>
						<div ref={toScrollElement}></div>
						<div className={styles.section}>
							<h5 className={styles.title}>Collision Stats</h5>
							<StatDisplay
								array={hashTableDictionary.allCollisions}
								fractionDigits={3}
							/>
						</div>
						<div className={styles.section}>
							<h5 className={styles.title}>Search In Dictionaries</h5>
							<TableInteractions
								hashDictionary={hashTableDictionary}
								dictionary={dictionary}
							/>
						</div>
						<CompareDictionaries
							dictionary={dictionary}
							hashDictionary={hashTableDictionary}
						/>
					</div>
				)}
			</TitledSection>
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
				"header",
				"projects",
				"dictionary",
			])),
		},
	}
}
export default Dictionary
