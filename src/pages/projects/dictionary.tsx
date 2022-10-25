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
import NumberInput from "../../components/NumberInput/NumberInput";
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
import { findAPrimeBiggerThan, getStats } from '../../projects-src/hashtabledict/utils';
import { DictionaryTypeException, TableSizeException } from '../../projects-src/hashtabledict/exceptions';
import MultistepInput from '../../components/MultistepInput/MultistepInput';
import { FileContent } from 'use-file-picker';




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
    const isReady = hashTableSize > 0 &&
                    pairSeperator.length > 0 &&
                    wordSeperator.length > 0 &&
                    hashFunctionString.length > 0 &&
                    collisionHandlerString.length > 0


    useEffect(() => {
        if (!toScrollElement.current) return
        toScrollElement.current.scrollIntoView({behavior: "smooth"})
    }, [hashTableDictionary])



    const validateInputsAndCreateHashTable = () => {
        let hashFunction: HashStringFunction | undefined
        let collisionHandler: OnCollisionNextIndexHandler | undefined

        // Validate functions.
        try {
            const hashFunctionEval = eval(`(input) => {${hashFunctionString}}`)
            const hashFuncTest = hashFunctionEval("helo");
            if (typeof hashFuncTest !== "number")
                throw new Error("Return type is not a number.")
            hashFunction = hashFunctionEval
        } catch (error: any) {
            hashFunction = undefined
            pushNotification(error.toString() as string, {
                type: "error",
                source: "Hash Function Input"
            })
        }

        try {
            const collisionHandlerEval = eval(`(currentHashValue, input, iteration) => {${collisionHandlerString}}`)
            const collisionFuncTest = collisionHandlerEval(19, "helo", 1)
            if(typeof collisionFuncTest !== "number")
                throw new Error("Return type is not a number.")
            collisionHandler = collisionHandlerEval
        } catch (error: any) {
            collisionHandler = undefined
            pushNotification(error.toString(), {
                type: "error",
                source: "Collision Handler Input"
            })
        }        
        
        try {
            if (hashFunction === undefined || collisionHandler === undefined || dictionaryArray === undefined)
                return

            const hashTable = createHashTableFromDictionary(dictionaryArray, {
                hashFunction,
                collisionHandler,
                hashTableSize,
                throwInfiniteLoopError,
            })
            console.log(hashTable.allCollisions.reduce((p,c) => p+c))
            console.log(getStats(hashTable.allCollisions));
            
            setHashTableDictionary(hashTable)

            
        } catch (error: any) {
            if (error instanceof DictionaryTypeException) {
                const message = `${error.message}\r\nPlease check seperators or the text file.`
                pushNotification(message, { type: "error", source: "Create Hash Table", durationSeconds: 5000 })
                return
            }
            if (error instanceof TableSizeException) {
                const message = `${error.message}\r\nPlease give a larger table size value.`
                pushNotification(message, { type: "error", source: "Create Hash Table", durationSeconds: 5000 })
                return
            }
            pushNotification(error.toString(), { type: "error", source: "Create Hash Table", durationSeconds: 5000 })
        }
    }

    


    
    return (
        <>
            <Head>
                <title>Dictionary</title>
            </Head>

            <div className={styles.container}>
                <h2 className={styles.title}>{projectsT("hashTableDictionary")}</h2>
                <p className={styles.description}>{dictionaryT("description")}</p>


                <button onClick={() => {pushNotification("Hello amk")}}>Add</button>
                {/* <FramerComp/> */}
                {/* <CodeSandbox/> */}
                <MultistepInput
                    onFinish={() => {}}
                >
                    <div>
                        <label htmlFor={styles.name}>Name</label>
                        <input id={styles.name} type="text" />
                        <TextInput/>
                    </div>
                    <div>
                        <label htmlFor={styles.surname}>Surname</label>
                        <input id={styles.surname} type="text" />
                    </div>
                    <div>
                        <label htmlFor={styles.age}>Age</label>
                        <input id={styles.age} type="number" />
                    </div>                    
                </MultistepInput>
                
                <div className={styles.inputs}>
                    <div className={styles.fileInput}>
                        <HoverHelp message="A .txt file that has word-translation pairs with a seperator between them."/>
                        <span className={styles.fileInputTitle}>Dictionary Array: </span>
                        <div className={styles.inputField}>
                            <FileChooser
                                label="Choose a Text File"
                                onChange={(fileContent) => {
                                    setFileContent(fileContent)
                                }}
                            />
                            <span>{fileContent? fileContent.name:"No File Chosen"}</span>
                            <div className={styles.regexp}>
                                <TextInput
                                    placeholder='Word Seperator'
                                    value={wordSeperator}
                                    onChange={setWordSeperator}
                                />
                                <HoverHelp message='Regexp for seperating word from its translation. Default: / {2,}/'/>
                            </div>
                            <div className={styles.regexp}>
                                <TextInput
                                    placeholder='Pair Seperator'
                                    value={pairSeperator}
                                    onChange={setPairSeperator}
                                />
                                <HoverHelp message='Regexp for seperating each word-translation pairs. Default: /\r\n/'/>
                            </div>
                            <ThemedButton
                                label='Create Array'
                                disabled={!pairSeperator || !wordSeperator || !fileContent}
                                onClick={() => {
                                    if (!fileContent) return
                                    const dictArray = createDictionaryArrayFromString(
                                        fileContent?.content,
                                        new RegExp(wordSeperator),
                                        new RegExp(pairSeperator),
                                    )
                                    setDictionaryArray(dictArray)
                                }}
                            />
                        </div>
                        <ThemedButton
                            label='Use Default'
                            onClick={async () => {
                                try {
                                    const response = await fetch("/en-tr-dictionary.txt")
                                    const file = await response.text()
                                    setFileContent({
                                        content: file,
                                        name: "en-tr-dictionary.txt",
                                        lastModified:0
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
                            }}
                        />
                    </div>

                    <div className={styles.tableSizeInput}>
                        <HoverHelp message='Recommended size is a prime number bigger than four times the number of words.'/>
                        <NumberInput
                            title="Hash Table Size:"
                            value={hashTableSize}
                            onChange={setHashTableSize}
                        />
                        <ThemedButton 
                            label='Use Default'
                            disabled={!dictionaryArray}
                            onClick={() => {
                                if (!dictionaryArray) return
                                const recommendedSize = findAPrimeBiggerThan(dictionaryArray.length*4)
                                setHashTableSize(recommendedSize)
                            }}
                        />
                    </div>
                    <div className={styles.throwErrorInput}>
                        <HoverHelp message="Set this option if you don't use iteration parameter in collision handler function."/>
                        <label className={styles.throwErrorTitle} htmlFor={styles.throwLoopError}>Throw Infinite Collision Loop Error:</label>
                        <input
                            id={styles.throwLoopError}
                            type="checkbox"
                            checked={throwInfiniteLoopError}
                            onChange={(e) => setThrowInfiniteLoopError(e.target.checked)}
                        />
                    </div>
                    <div className={styles.codeInputs}>
                        <CodeInput
                            className={styles.codeInput}
                            editorClassName={styles.editor}
                            title="Hash Function"
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
                        <CodeInput
                            className={styles.codeInput}
                            editorClassName={styles.editor}
                            title="Collision Handler"
                            boilerplateTop={collisionHandlerBoilerplate}
                            boilerplateBottom="}"
                            value={collisionHandlerString}
                            onChange={setCollisionHandlerString}
                            rows={6}
                            topBarButtonLeft={
                                <ThemedButton
                                    label='Use Default'
                                    onClick={() => setCollisionHandlerString(defaultCollisionHandlerString)}
                                />
                            }
                            topBarButtonRight={<HoverHelp message="When hash indexes collide this function is called to get the next index." />}
                        />
                    </div>
                </div>
                <ThemedButton disabled={!isReady} onClick={validateInputsAndCreateHashTable}>Create Hash Table</ThemedButton>
                
                {hashTableDictionary &&
                <div className={styles.createdTable}>
                    <div className={styles.successfullTitle}>Table Created</div>
                    <div ref={toScrollElement} className={styles.tableContent}>

                    </div>
                </div>
                }
            </div>            
        </>
    )
}





Dictionary.getLayout = (page: ReactElement) => {
    return(
        <BasicLayout>
            {page}
        </BasicLayout>
    )
}


export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
        ...(await serverSideTranslations(locale as string, ["common", "projects", "dictionary", "header", "notifications", "contact-button"])),
        }
    }
}


export default Dictionary