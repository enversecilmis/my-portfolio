import styles from '../../styles/dictionary.module.scss'
import Head from "next/head";
import { ReactElement, useEffect, useRef, useState } from "react";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextPageWithLayout } from "../_app";
import { useTranslation } from "next-i18next";
import BasicLayout from "../../layouts/BasicLayout";

import { useNotification } from "../../contexts/NotificationContext";
import FileChooser from "../../components/FileChooser/FileChooser";
import CodeInput from "../../components/CodeInput/CodeInput";
import HoverHelp from "../../components/HoverHelp/HoverHelp";
import ThemedButton from '../../components/ThemedButton/ThemedButton';
import TextInput from '../../components/TextInput/TextInput';

import {
    Dictionary,
    DictionaryHashTable,
    HashStringFunction,
    OnCollisionNextIndexHandler
} from "../../projects-src/hashtabledict/types";
import {
    collisionHandlerBoilerplate,
    defaultCollisionHandlerString,
    defaultHashFunctionString,
    hashFunctionBoilerplate,
    createDictionaryArrayFromString,
    createHashTableFromDictionary,
} from "../../projects-src/hashtabledict/hashtabledict";
import { findAPrimeBiggerThan, getStats, zDictionaryArray } from '../../projects-src/hashtabledict/utils';
import { DictionaryTypeException, TableSizeException } from '../../projects-src/hashtabledict/exceptions';
import MultistepInput from '../../components/MultistepInput/MultistepInput';
import { FileContent } from 'use-file-picker';
import NumberInput from '../../components/NumberInput/NumberInput';




// TODO: This code is a mess. Fix later.



const Dictionary: NextPageWithLayout = () => {
    const { t: dictionaryT } = useTranslation("dictionary")
    const { t: projectsT } = useTranslation("projects")
    const { pushNotification } = useNotification()
    const toScrollElement = useRef<HTMLDivElement>(null)
    const [dictionaryArray, setDictionaryArray] = useState<Dictionary>()
    const [hashTableDictionary, setHashTableDictionary] = useState<DictionaryHashTable>()


    const [fileContent, setFileContent] = useState<FileContent>()
    const [wordSeperator, setWordSeperator] = useState("")
    const [pairSeperator, setPairSeperator] = useState("")
    const [hashTableSize, setHashTableSize] = useState(0)
    const [hashFunctionString, setHashFunctionString] = useState("")
    const [collisionHandlerString, setCollisionHandlerString] = useState("")
    const [throwInfiniteLoopError, setThrowInfiniteLoopError] = useState(false)
    const [isCreatingDictArr, setIsCreatingDictArr] = useState(false)
    const isReady = hashTableSize > 0 &&
        pairSeperator.length > 0 &&
        wordSeperator.length > 0 &&
        hashFunctionString.length > 0 &&
        collisionHandlerString.length > 0


    useEffect(() => {
        if (!toScrollElement.current) return
        toScrollElement.current.scrollIntoView({ behavior: "smooth" })
    }, [hashTableDictionary])



    const validateInputsAndCreateHashTable = () => {
        let hashFunction: HashStringFunction | undefined
        let collisionHandler: OnCollisionNextIndexHandler | undefined

        // Validate hash function.
        try {
            const hashFunctionEval = eval(`(input) => {${hashFunctionString}}`)
            const hashFuncOutput = hashFunctionEval("helo");

            if (typeof hashFuncOutput !== "number")
                throw new Error("Return type is not a number.")

            hashFunction = hashFunctionEval

        } catch (error: any) {
            hashFunction = undefined
            pushNotification(error.toString() as string, {
                type: "error",
                source: "Hash Function Input"
            })
        }

        // Validate collision handler.
        try {
            const collisionHandlerEval = eval(`(currentHashValue, input, iteration) => {${collisionHandlerString}}`)
            const collisionFuncOutput = collisionHandlerEval(19, "helo", 1)

            if (typeof collisionFuncOutput !== "number")
                throw new Error("Return type is not a number.")

            collisionHandler = collisionHandlerEval

        } catch (error: any) {
            collisionHandler = undefined
            pushNotification(error.toString(), {
                type: "error",
                source: "Collision Handler Input"
            })
        }

        // Try to create hash table dictionary.
        try {
            if (hashFunction === undefined || collisionHandler === undefined || dictionaryArray === undefined)
                return

            const hashTable = createHashTableFromDictionary(dictionaryArray, {
                hashFunction,
                collisionHandler,
                hashTableSize,
                throwInfiniteLoopError,
            })

            setHashTableDictionary(hashTable)

        } catch (error: any) {
            if (error instanceof DictionaryTypeException) {
                const message = `${error.message}\r\nPlease check seperators or the text file.`
                pushNotification(message, { type: "error", source: "Create Hash Table", durationSeconds: 6000 })
                return
            }
            if (error instanceof TableSizeException) {
                const message = `${error.message}\r\nPlease give a larger table size value.`
                pushNotification(message, { type: "error", source: "Create Hash Table", durationSeconds: 6000 })
                return
            }
            pushNotification(error.toString(), { type: "error", source: "Create Hash Table", durationSeconds: 6000 })
        }
    }

    const fetchDefaultFile = async () => {
        try {
            const response = await fetch("/en-tr-dictionary.txt")
            const file = await response.text()
            setFileContent({
                content: file,
                name: "en-tr-dictionary.txt",
                lastModified: 0
            })
            setWordSeperator(" {2,}")
            setPairSeperator("\\r\\n")
        }
        catch (error: any) {
            let message: string
            if (error instanceof Error)
                message = error.toString()
            else
                message = "Unknown error occurred."
            pushNotification(message, {
                type: "error",
                source: "Create Dictionary Array"
            })
        }
    }
    const createDictionaryArray = async () => {
        if (!fileContent?.content) return
        setIsCreatingDictArr(true)
        
        const dictArr = createDictionaryArrayFromString(
            fileContent.content,
            new RegExp(wordSeperator),
            new RegExp(pairSeperator)
        )
        if (!zDictionaryArray.safeParse(dictArr).success)
            pushNotification("Created array structure is not [string,string][]. Check your text file or seperators.",{
                type: "error",
                durationSeconds: 6000,
                source: "Create Dictionary Array"
            })
        else
            setDictionaryArray(dictArr)
        setIsCreatingDictArr(false)
    }



    return (
        <>
            <Head>
                <title>Dictionary</title>
            </Head>

            <main className={styles.container}>
                <h2 className={styles.pageTitle}>{projectsT("hashTableDictionary")}</h2>
                <p className={styles.description}>{dictionaryT("description")}</p>


                <MultistepInput
                    className={styles.multiStepInputs}
                    onFinish={() => validateInputsAndCreateHashTable()}
                >
                    <div className={styles.inputStep}>
                        <h3 className={styles.stepTitle}>Create Dictionary Array</h3>
                        <div className={styles.stepContent}>
                            <div className={styles.labeledInput}>
                                <HoverHelp message="A .txt file that has words and their translation with seperators." />
                                <label className={styles.label}>File: </label>
                                <FileChooser
                                    required
                                    fileSelected={!!fileContent}
                                    label='Choose a Text File'
                                    accept='.txt'
                                    multiple={false}
                                    onChange={setFileContent}
                                />
                                <ThemedButton
                                    label='Use Default'
                                    onClick={fetchDefaultFile}
                                />
                            </div>
                            {fileContent?.name}
                            <div className={styles.labeledInput}>
                                <HoverHelp message='Regexp for seperating each word-translation pairs.' />
                                <label className={styles.label}>Word Seperator: </label>
                                <TextInput
                                    required
                                    placeholder='Word Seperator'
                                    value={wordSeperator}
                                    onChange={setWordSeperator}
                                />
                            </div>
                            <div className={styles.labeledInput}>
                                <HoverHelp message='Regexp for seperating word from its translation.' />
                                <label className={styles.label}>Pair Seperator: </label>
                                <TextInput
                                    required
                                    placeholder='Pair Seperator'
                                    value={pairSeperator}
                                    onChange={setPairSeperator}
                                />
                            </div>
                            <ThemedButton
                                className={styles.createArrayButton}
                                label='Create'
                                onClick={createDictionaryArray}
                                loading={isCreatingDictArr}
                            />
                            {!!dictionaryArray && !isCreatingDictArr && (
                            <div className={styles.createdArray}>
                                <p className={styles.infoText}>Dictionary Created</p>
                                <p>{dictionaryArray.length} words found</p>
                            </div>
                            )}
                        </div>

                    </div>
                    <div className={styles.inputStep}>
                        <h3 className={styles.stepTitle}>Hash Function</h3>
                        <CodeInput
                            required
                            className={styles.codeInput}
                            editorClassName={styles.editor}
                            boilerplateTop={hashFunctionBoilerplate}
                            boilerplateBottom="}"
                            value={hashFunctionString}
                            onChange={setHashFunctionString}
                            rows={6}
                            topBarButtonLeft={
                                <ThemedButton
                                    label='Use Default'
                                    onClick={() => setHashFunctionString(defaultHashFunctionString)}
                                />
                            }
                        />
                    </div>
                    <div className={styles.inputStep}>
                        <h3 className={styles.stepTitle}>Collision Handler</h3>
                        <CodeInput
                            required
                            className={styles.codeInput}
                            boilerplateTop={collisionHandlerBoilerplate}
                            boilerplateBottom="}"
                            value={collisionHandlerString}
                            onChange={setCollisionHandlerString}
                            rows={2}
                            topBarButtonLeft={
                                <ThemedButton
                                    label='Use Default'
                                    onClick={() => setCollisionHandlerString(defaultCollisionHandlerString)}
                                />
                            }
                            topBarButtonRight={<HoverHelp message="When hash indexes collide this function is called to get the next index." />}
                        />
                        <div className={styles.labeledInput}>
                            <HoverHelp message="Set this option if you don't use iteration parameter in collision handler function." />
                            <label className={styles.label} htmlFor={styles.throwLoopError}>Throw Infinite Collision Loop Error:</label>
                            <input
                                id={styles.throwLoopError}
                                type="checkbox"
                                checked={throwInfiniteLoopError}
                                onChange={(e) => setThrowInfiniteLoopError(e.target.checked)}
                            />
                        </div>
                    </div>
                    <div className={styles.inputStep}>
                        <h3 className={styles.stepTitle}>Hash Table Size</h3>
                        <NumberInput
                            required
                            value={hashTableSize}
                            onChange={setHashTableSize}
                        />
                        <ThemedButton label='Use Default' onClick={() => {
                            if (dictionaryArray)
                                setHashTableSize(findAPrimeBiggerThan(dictionaryArray?.length*4))
                        }}/>
                    </div>
                </MultistepInput>
                {hashTableDictionary &&
                <div ref={toScrollElement} className={styles.hashTableContainer}>
                    <p className={styles.createdHashTableInfo}>Hash Table Created</p>
                    <p>Search in dictionary</p>
                    <TextInput/>
                    <p>Search in hash table dictionary</p>
                    <TextInput/>
                </div>
                
                }

            </main>
        </>
    )
}





Dictionary.getLayout = (page: ReactElement) => {
    return (
        <BasicLayout>
            {page}
        </BasicLayout>
    )
}


export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale as string, ["common", "header", "projects", "dictionary"])),
        }
    }
}


export default Dictionary