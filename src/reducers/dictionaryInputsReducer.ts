import { Reducer } from "react"
import { FileContent } from "use-file-picker"

export type Inputs = {
    fileContent: FileContent | undefined,
    wordSeperator: string,
    pairSeperator: string,
    hashFunctionString: string,
    collisionHandlerString: string,
    hashTableSize: number,
    throwInfiniteLoopError: boolean,
    isReady: boolean,
}

export enum ACTIONS {
    setFileContent = "fileContent",
    setWordSeperator = "wordSeperator",
    setPairSeperator = "pairSeperator",
    setHashFunctionString = "hashFunctionString",
    setCollisionHandlerString = "collisionHandlerString",
    setHashTableSize = "hashTableSize",
    setThrowInfiniteLoopError = "throwInfiniteLoopError",
}

export type TypedPayload <T extends ACTIONS> = {
    type: T,
    payload: Inputs[T]
}

export type ActionWithTypedPayload =
    TypedPayload<ACTIONS.setFileContent>|
    TypedPayload<ACTIONS.setWordSeperator>|
    TypedPayload<ACTIONS.setPairSeperator>|
    TypedPayload<ACTIONS.setHashFunctionString>|
    TypedPayload<ACTIONS.setCollisionHandlerString>|
    TypedPayload<ACTIONS.setHashTableSize>|
    TypedPayload<ACTIONS.setThrowInfiniteLoopError>

// All these typescript shenanigans so that the
// payload is typed according to the action type.
// Also we can just return { ...state, [type]: payload } from reducer
// if all we want to do is to set the state.
// If we need extra computation based on provided value, we can just
// add the case for it.


export const inputsReducer: Reducer<Inputs, ActionWithTypedPayload> = (
    state: Inputs,
    action: ActionWithTypedPayload
): Inputs => {
    let newState: Inputs
    const { type, payload } = action
    switch(type) {
        case ACTIONS.setHashTableSize:
            newState = payload < 0 ?
                    { ...state, hashTableSize: 0 }:
                    { ...state, hashTableSize: payload}
        default:
            newState = { ...state, [type]: payload }   
    }
    const isReady = newState.hashTableSize > 0 &&
                    newState.pairSeperator.length > 0 &&
                    newState.wordSeperator.length > 0 &&
                    newState.hashFunctionString.length > 0 &&
                    newState.collisionHandlerString.length > 0
    return { ...newState, isReady }
}