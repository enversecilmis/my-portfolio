import styles from '../../styles/dictionary.module.scss'
import Head from "next/head";
import { ReactElement, useEffect, useReducer, useRef } from "react";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextPageWithLayout } from "../_app";
import { useTranslation } from "next-i18next";
import BasicLayout from "../../layouts/BasicLayout";
import ProjectsLayout from "../../layouts/ProjectsLayout";

import { useNotification } from "../../contexts/NotificationContext";
import FileChooser from "../../components/FileChooser/FileChooser";
import CodeInput from "../../components/CodeInput/CodeInput";
import NumberInput from "../../components/NumberInput/NumberInput";
import HoverHelp from "../../components/HoverHelp/HoverHelp";
import ThemedButton from '../../components/ThemedButton/ThemedButton';
import TextInput from '../../components/TextInput/TextInput';

import {
    Dictionary,
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
import { findAPrimeBiggerThan } from '../../projects-src/hashtabledict/utils';
import { ACTIONS, inputsReducer } from '../../reducers/dictionaryInputsReducer';
import { DictionaryTypeException, TableSizeException } from '../../projects-src/hashtabledict/exceptions';


// TODO: Fix seperator inputs. (Getting regexp input doesn't work properly.)



const Dictionary: NextPageWithLayout = () => {
    const { t: dictionaryT } = useTranslation("dictionary")
    const { t: projectsT } = useTranslation("projects")
    const { pushNotification } = useNotification()
    let dictionaryArray = useRef<Dictionary>()

    
    // Object destructuring inside array doesn't work for some reason. (dispatch becomes undefined)
    const [
        state,
        dispatch
    ] = useReducer( inputsReducer, {
        fileContent: undefined,
        wordSeperator: "",
        pairSeperator: "",
        hashFunctionString: "",
        collisionHandlerString: "",
        hashTableSize: 0,
        throwInfiniteLoopError: false,
    })
    const {fileContent, wordSeperator, pairSeperator, hashFunctionString, collisionHandlerString, hashTableSize, throwInfiniteLoopError} = state



    useEffect(() => {
        if(!fileContent)
            return
        dictionaryArray.current = createDictionaryArrayFromString(fileContent.content)
        const recommendedSize = findAPrimeBiggerThan(dictionaryArray.current.length*4)
        dispatch({ type: ACTIONS.setWordSeperator, payload: " {2,}" })
        dispatch({ type: ACTIONS.setPairSeperator, payload: "\\r\\n" })
        dispatch({ type: ACTIONS.setHashTableSize, payload: recommendedSize })
        
    }, [fileContent])


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
            if (hashFunction === undefined || collisionHandler === undefined || dictionaryArray.current === undefined)
                return
            
            createHashTableFromDictionary(dictionaryArray.current, {
                hashFunction,
                collisionHandler,
                hashTableSize,
                throwInfiniteLoopError,
            })
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

                <div className={styles.inputs}>
                    <div className={styles.fileInput}>
                        <span className={styles.fileInputTitle}>File: </span>
                        <FileChooser
                            label="Choose a Text File"
                            onChange={(fileContent) => {
                                dispatch({
                                    type: ACTIONS.setFileContent,
                                    payload: fileContent
                                })
                            }}
                        />
                        <ThemedButton
                            label='Use Default'
                            onClick={async () => {
                                const response = await fetch("/en-tr-dictionary.txt")
                                const file = await response.text()
                                dispatch({
                                    type: ACTIONS.setFileContent,
                                    payload: {
                                        content: file,
                                        name: "en-tr-dictionary.txt",
                                        lastModified:0
                                    }
                                })
                            }}
                        />
                        {fileContent?.name}
                        <HoverHelp message="A .txt file that has word-translation pairs with a seperator between them."/>
                    </div>
                    <div className={styles.regexInput}>
                        <TextInput
                            title='Word Seperator:'
                            value={wordSeperator}
                            onChange={(text) => dispatch({
                                type: ACTIONS.setWordSeperator,
                                payload: text
                            })}
                        />
                        <HoverHelp message='Regexp for seperating word from its translation. Default: / {2,}/'/>
                    </div>
                    <div className={styles.regexInput}>
                        <TextInput
                            title='Pair Seperator:'
                            value={pairSeperator}
                            onChange={(text) => dispatch({
                                type: ACTIONS.setPairSeperator,
                                payload: text
                            })}
                        />
                        <HoverHelp message='Regexp for seperating each word-translation pairs. Default: /\r\n/'/>
                    </div>
                    <div className={styles.tableSizeInput}>
                        <NumberInput
                            title="Hash Table Size:"
                            value={hashTableSize}
                            onChange={(number) => dispatch({
                                type: ACTIONS.setHashTableSize,
                                payload: number
                            })}
                        />
                        <HoverHelp message='Recommended size is a prime number bigger than four times the number of words.'/>
                    </div>
                    <div className={styles.throwErrorInput}>
                        <label className={styles.throwErrorTitle} htmlFor={styles.throwLoopError}>Throw Infinite Collision Loop Error:</label>
                        <input
                            id={styles.throwLoopError}
                            type="checkbox"
                            checked={throwInfiniteLoopError}
                            onChange={(e) => dispatch({
                                type: ACTIONS.setThrowInfiniteLoopError,
                                payload: e.target.checked
                            })}
                        />
                        <HoverHelp message="Set this option if you don't use iteration parameter in collision handler function."/>
                    </div>
                    <div className={styles.codeInputs}>
                        <CodeInput
                            className={styles.codeInput}
                            editorClassName={styles.editor}
                            title="Hash Function"
                            boilerplateTop={hashFunctionBoilerplate}
                            boilerplateBottom="}"
                            value={hashFunctionString}
                            onChange={(text) => dispatch({
                                type: ACTIONS.setHashFunctionString,
                                payload: text
                            })}
                            rows={6}
                            topBarButtonLeft={
                                <ThemedButton
                                    label='Use Default'
                                    onClick={() => dispatch({
                                        type: ACTIONS.setHashFunctionString,
                                        payload: defaultHashFunctionString
                                    })}
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
                            onChange={(text) => dispatch({
                                type: ACTIONS.setCollisionHandlerString,
                                payload: text
                            })}
                            rows={6}
                            topBarButtonLeft={
                                <ThemedButton
                                    label='Use Default'
                                    onClick={() => dispatch({
                                        type: ACTIONS.setCollisionHandlerString,
                                        payload: defaultCollisionHandlerString
                                    })}
                                />
                            }
                            topBarButtonRight={<HoverHelp message="When hash indexes collide this function is called to get the next index." />}
                        />
                    </div>
                </div>
                <ThemedButton onClick={validateInputsAndCreateHashTable}>Create Hash Table</ThemedButton>
                <div></div>
            </div>            
        </>
    )
}





Dictionary.getLayout = (page: ReactElement) => {
    return(
        <BasicLayout>
            <ProjectsLayout>
                {page}
            </ProjectsLayout>
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